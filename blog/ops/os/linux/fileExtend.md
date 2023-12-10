---
date: 2021-09-02


---
# 磁盘扩容

相关查询命令: `df -h` `vgs` `lsblk`

![](https://gitee.com/zengsl/picBed/raw/master/img/20210902111117.png)

根目录下空间过小，home下面有比较大的空闲空间，将home的空间转移一部分到根下。

按照以下步骤操作：

``` shell
#备份home目录
tar cvf /data/home.tar /home

# 我们切换到根目录下开始表演

# 取消home的挂载
umount /home

# 删除home对应的文件系统
lvremove /dev/mapper/centos-home

# 查看空间 
vgs

# 扩展100G空间到根目录对应的文件系统的lv
lvextend -L +100G /dev/mapper/centos-root

# 扩展文件系统
xfs_growfs  /dev/mapper/centos-root 

# 开始处理home目录

# 新建文件系统lv
lvcreate -L 100G -n /dev/mapper/centos-home

# 创建文件系统
mkfs.xfs  /dev/mapper/centos-home 

# 挂载home目录
mount /dev/mapper/centos-home 

# 将备份的home目录还原
tar xvf /data/home.tar -C /

# 查看结果
df -h
```

![](https://gitee.com/zengsl/picBed/raw/master/img/20210902113455.png)