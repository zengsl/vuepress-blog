---
order: 3
category:
  - 后端
tag:
  - Mybatis
  - ORM
date: 2020-10-19

---
# 其他

## 刷新mapper

~~~ java
package com.iris.egrant.mybatis;

import com.baomidou.mybatisplus.core.MybatisConfiguration;
import com.baomidou.mybatisplus.core.MybatisMapperRegistry;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.builder.xml.XMLMapperBuilder;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.mapper.MapperFactoryBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.Resource;
import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.*;

/**
 * 刷新Mybatis的mapper缓存，重新加载sql语句，避免修改sql之后需要重启之后才能观察效果，提高开发效率。<br/>
 *
 *  <p>该方法采用定时器执行缓存刷新的逻辑，<strong>refreshMapper</strong>为核心方法。</p>
 *<br/>
 *<p>主要逻辑：</p>
 * <ol>
 *     <li>Bean初始化时加载所有的mapper文件</li>
 *     <li>Spring上下文初始化结束之后，创建后台任务执行<strong>refreshMapper</strong><br/>
 *     创建后台任务必须满足以下两个条件：
 *     <p>enable设置为true，该值默认为false。开发人员可在需要开启的时，将其设置为true</p>
 *     <p>只在开发环境运行</p>
 *     </li>
 * </ol>
 * @author zengsl
 * @version V1.0
 * @date 2020/10/15 10:30 上午
 */
public class RefreshMapperCache implements ApplicationListener<ContextRefreshedEvent> , InitializingBean {

    private final Log log = LogFactory.getLog(getClass());

    private SqlSessionFactory sqlSessionFactory;

    /**
     * 所有mapper文件
     */
    private Resource[] mapperLocations;

    /**
     * 定时器启动标识，默认为不启动，如需启动请在配置文件中设置为true
     */
    private boolean enable = false;

    /**
     * 可运行环境<br/>
     * 开发与linux开发环境
     */
    public final static List<String> EXECUTE_ENVIRONMENT = Arrays.asList("development", "linuxdev");


    /**
     * 保存最新的文件
     */
    private final HashMap<String, Long> fileMapping = new HashMap<>();

    /**
     * 当前执行状态
     */
    private ExecuteState currentExecuteState = ExecuteState.STOP;


    @Override
    public void afterPropertiesSet() throws Exception {
        // bean初始化时，先将所有的mapper文件加载至fileMapping
        loadMapper();
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (event.getApplicationContext().getParent() != null) {
            log.info("不触发事件");
            return;
        }

        if(currentExecuteState == ExecuteState.RUNNING) {
            log.info("任务已执行，不再重复执行");
            return;
        }

        initRefreshTask();
        currentExecuteState = ExecuteState.RUNNING;
    }

    /**
     * 初始化刷新任务
     *
     * @date 2020/10/16 4:43 下午
     */
    protected void initRefreshTask() {
        if (!enable) {
            return;
        }
        String runEnv = System.getProperty("spring.profiles.active", "run");
        // 判断是否可运行环境
        if (!EXECUTE_ENVIRONMENT.contains(runEnv)) {
            return;
        }
        try {
            new Timer(true).schedule(new TimerTask() {
                @Override
                public void run() {
                    refreshMapper();
                }
            }, 10 * 1000, 5 * 1000);
        } catch (Exception e) {
            log.error("定时器启动失败", e);
        }
    }

    /**
     * 刷新所有mapper配置的核心方法
     *
     * @author zengsl
     * @date 2020/10/16 5:17 下午
     */
    @SuppressWarnings("rawtypes")
    public void refreshMapper() {
        try {
            Configuration configuration = this.sqlSessionFactory.getConfiguration();
            // 判断是否有文件发生了变化
            if (!this.isChanged()) {
                return;
            }

            // 清理配置
            this.removeConfig(configuration);
            // 重新加载配置文件
            for (Resource configLocation : mapperLocations) {
                try {

                    XMLMapperBuilder xmlMapperBuilder = new XMLMapperBuilder(configLocation.getInputStream(), configuration, configLocation.toString(), configuration.getSqlFragments());
                    xmlMapperBuilder.parse();
                    log.info("mapper文件[" + configLocation.getFilename() + "]缓存加载成功");
                } catch (IOException e) {
                    log.error("mapper文件[" + configLocation.getFilename() + "]不存在或内容格式不对", e);
                }
            }
            WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
            ConfigurableWebApplicationContext wac = (ConfigurableWebApplicationContext) webApplicationContext;
            assert wac != null;
            // 重新初始化MapperFactoryBean
            Map<String, MapperFactoryBean> beanMaps = wac.getBeansOfType(MapperFactoryBean.class);
            for (Map.Entry<String, MapperFactoryBean> beanMap : beanMaps.entrySet()) {
                MapperFactoryBean mapperFactoryBean = beanMap.getValue();
                mapperFactoryBean.afterPropertiesSet();
            }

            log.info("****************刷新缓存结束");
        } catch (Exception e) {
            log.error("****************刷新缓存异常： ", e);
        }
    }

    /**
     * 加载所有mapper配置
     *
     * @author zengsl
     * @date 2020/10/16 5:16 下午
     */
    private void loadMapper() throws IOException {
        for (Resource resource : mapperLocations) {
            String resourceName = resource.getFilename();
            log.info("resourceName == " + resourceName + ",  path = " + resource.getURL().getPath());
            long lastFrame = resource.contentLength() + resource.lastModified();
            fileMapping.put(resourceName, lastFrame);
        }
    }

    /**
     * 判断文件是否发生了变化
     *
     * @return true 变化 false 无变化
     * @throws IOException 配置文件加载错误
     */
    private boolean isChanged() throws IOException {
        boolean flag = false;
        log.info("***************************获取文件名   开始************************************");
        for (Resource resource : mapperLocations) {
            String resourceName = resource.getFilename();

            log.info("resourceName == " + resourceName + ",  path = " + resource.getURL().getPath());

            // 此为新增标识
            boolean addFlag = !fileMapping.containsKey(resourceName);

            // 修改文件:判断文件内容是否有变化
            Long compareFrame = fileMapping.get(resourceName);
            long lastFrame = resource.contentLength() + resource.lastModified();
            // 此为修改标识
            boolean modifyFlag = null != compareFrame && compareFrame != lastFrame;

            if (addFlag) {
                log.info("新增了：===" + resourceName);
            }
            if (modifyFlag) {
                log.info("修改了：===" + resourceName);
            }

            // 新增或是修改时,存储文件
            if (addFlag || modifyFlag) {
                // 文件内容帧值
                fileMapping.put(resourceName, lastFrame);
                flag = true;
            }
        }
        log.info("***************************获取文件名   结束************************************");
        return flag;
    }

    /**
     * 清空Configuration中几个重要的缓存
     *
     * @param configuration mybatis配置对象，如果使用的是mybatis-plus该对象可能是继承了mybatis配置对象的一个对象
     * @throws Exception 反射清除缓存对象出错。比如：找不到定义的属性
     */
    private void removeConfig(Configuration configuration) throws Exception {
        Class<?> classConfig = configuration.getClass();
        clearMap(classConfig, configuration, "mappedStatements");
        clearMap(classConfig, configuration, "caches");
        clearMap(classConfig, configuration, "resultMaps");
        clearMap(classConfig, configuration, "parameterMaps");
        clearMap(classConfig, configuration, "keyGenerators");
        clearMap(classConfig, configuration, "sqlFragments");

        clearSet(classConfig, configuration, "loadedResources");

        // 清理mapper接口缓存
        clearRegistry(classConfig, configuration);
        if (configuration instanceof MybatisConfiguration) {
            ((MybatisConfiguration) configuration).getGlobalConfig().getMapperRegistryCache().clear();
        }
    }

    @SuppressWarnings("rawtypes")
    private void clearRegistry(Class<?> classConfig, Configuration configuration) throws Exception {
        Field fieldRegistry = classConfig.getDeclaredField("mybatisMapperRegistry");
        fieldRegistry.setAccessible(true);

        MybatisMapperRegistry mybatisMapperRegistry = (MybatisMapperRegistry) fieldRegistry.get(configuration);
        Class<?> registryConfig = mybatisMapperRegistry.getClass();
        Field fieldKnownMappers = registryConfig.getDeclaredField("knownMappers");
        fieldKnownMappers.setAccessible(true);
        Map mapConfig = (Map) fieldKnownMappers.get(mybatisMapperRegistry);
        mapConfig.clear();

    }

    @SuppressWarnings("rawtypes")
    private void clearMap(Class<?> classConfig, Configuration configuration, String fieldName) throws Exception {
        Field field;
        try {
            field = classConfig.getDeclaredField(fieldName);
        } catch (NoSuchFieldException e) {
            field = classConfig.getSuperclass().getDeclaredField(fieldName);
        }

        field.setAccessible(true);


        Map mapConfig = (Map) field.get(configuration);
        mapConfig.clear();

    }

    @SuppressWarnings("rawtypes")
    private void clearSet(Class<?> classConfig, Configuration configuration, String fieldName) throws Exception {
        Field field;
        try {
            field = classConfig.getDeclaredField(fieldName);
        } catch (NoSuchFieldException e) {
            field = classConfig.getSuperclass().getDeclaredField(fieldName);
        }

        field.setAccessible(true);
        Set setConfig = (Set) field.get(configuration);
        setConfig.clear();
    }


    public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
    }

    public void setMapperLocations(Resource[] mapperLocations) {
        this.mapperLocations = mapperLocations;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    /**
     * 执行状态
     * @date 2020/10/16 4:48 下午
     */
    private enum ExecuteState {
        /**
         * 运行中
         */
        RUNNING,

        /**
         * 停止状态
         */
        STOP
    }

}
~~~ 


