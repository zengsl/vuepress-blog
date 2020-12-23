
# OAuth 2.0开发人员指南

> 对spring-security-oauth2的翻译
> 日期：2020-12-23
> spring-security-oauth2:2.3.5

[spring-security-oauth2原文](https://projects.spring.io/spring-security-oauth/docs/oauth2.html)


## 弃用通知

不建议使用Spring Security OAuth项目。 Spring Security提供了最新的OAuth 2.0支持。有关更多详细信息，请参见[《 OAuth 2.0迁移指南》](https://github.com/spring-projects/spring-security/wiki/OAuth-2.0-Migration-Guide)。

## 介绍

这是OAuth 2.0支持的用户指南。对于OAuth 1.0，一切都不同，因此请[参阅其用户指南](https://projects.spring.io/spring-security-oauth/docs/oauth1.html)。

本用户指南分为两部分，第一部分用于OAuth 2.0提供程序，第二部分用于OAuth 2.0客户端。对于提供者和客户而言，示例代码的最佳来源是[集成测试](https://github.com/spring-projects/spring-security-oauth/tree/master/tests)和[示例应用程序](https://github.com/spring-projects/spring-security-oauth/tree/master/samples/oauth2)。

## OAuth 2.0提供程序

OAuth 2.0提供程序机制负责公开受OAuth 2.0保护的资源。该配置涉及建立OAuth 2.0客户端，这些客户端可以独立或代表用户访问其受保护的资源。提供者通过管理和验证用于访问受保护资源的OAuth 2.0令牌来做到这一点。如果适用，提供者还必须为用户提供一个界面，以确认可以授予客户端访问受保护资源的权限（即确认页面）。

## OAuth 2.0提供程序实现

OAuth 2.0中的提供者角色实际上是在授权服务和资源服务之间分配的，尽管它们有时驻留在同一应用程序中，但使用Spring Security OAuth，您可以选择将它们拆分到两个应用程序中，并具有多个共享同一个授权服务的资源服务

拥有**授权服务器**和**资源服务器**

对令牌的请求由Spring MVC控制器端点处理(endpoints)，对受保护资源的访问由标准Spring Security请求过滤器处理。

为了实现OAuth 2.0授权服务器，Spring Security过滤器链中需要以下端点：

  - `AuthorizationEndpoint` 用于服务授权请求. 默认URL: /oauth/authorize.

  - `TokenEndpoint` 用于服务访问令牌的请求. 默认URL: /oauth/token.

为了实现OAuth 2.0资源服务器，需要以下过滤器：

 - `OAuth2AuthenticationProcessingFilter` 用于在给定经过身份验证的访问令牌的情况下为请求加载身份验证.

对于所有OAuth 2.0提供程序功能，可使用特殊的Spring OAuth **@Configuration适配器**简化配置。

还有一个用于OAuth配置的XML名称空间，该模式位于[https://www.springframework.org/schema/security/spring-security-oauth2.xsd](https://www.springframework.org/schema/security/spring-security-oauth2.xsd)。命名空间为`http://www.springframework.org/schema/security/oauth2`

## 授权服务器配置

配置授权服务器时，必须考虑客户端用于从最终用户获取访问令牌的授予类型（例如，authorization code授权码, user credentials, refresh token）。服务器的配置用于提供客户端明细服务和令牌服务的实现，并全局启用或禁用该机制的某些方面。但是请注意，可以为每个客户端专门配置权限，使其能够使用某些授权机制和访问授权。即仅仅因为您的提供程序配置为支持"client credentials"授予类型，并不意味着授权特定的客户端使用该授予类型。

`@EnableAuthorizationServer`注解和实现`AuthorizationServerConfigurer`的任何`@Bean`（具有空方法的便捷适配器实现）一起用于配置OAuth 2.0授权服务器机制，。

::: tip
AuthorizationServerConfigurerAdapter 是上面所提到的一个具有空方法的便捷适配器实现
:::

以下功能委托给由Spring创建并传递到`AuthorizationServerConfigurer`中的单独的配置器：

- `ClientDetailsS​​erviceConfigurer`：定义客户端明细服务的配置器configurer。可以初始化客户端明细，或者您可以仅引用现有存储的。

- `AuthorizationServerSecurityConfigurer`：定义令牌端点(token endpoint)上的安全约束。

- `AuthorizationServerEndpointsConfigurer`：定义授权和令牌端点(token endpoint)以及令牌服务。

提供者配置的一个重要方面是将授权代码提供给OAuth客户端的方式（在授权代码授权中）。 OAuth客户端通过将最终用户定向到可以在其中输入凭据的授权页面来获得授权码，从而导致从提供者授权服务器重定向回带有授权码的OAuth客户端。 OAuth 2规范中对此进行了详细说明。

在XML中，有一个`<authorization-server />`元素，该元素以类似的方式用于配置OAuth 2.0授权服务器

### 配置客户端明细（Client Details)

`ClientDetailsS​​erviceConfigurer`（来自`AuthorizationServerConfigurer`的回调）可用于定义in-memory或JDBC的客户端明细服务实现。

客户端的重要属性：

- clientId: (必填) 客户端id

- secret: （受信任的客户端必填）客户端机密（如果有）  (required for trusted clients) the client secret, if any. `TODO`

- scope: 客户端被限制范围，不设置或者为空则表示不受范围限制

- authorizedGrantTypes: 授权客户端使用的授权类型。默认值为空

- authorities: 授予客户端的权限（常规的Spring Security权限）

可以通过直接访问基础存储（例如，对于`JdbcClientDetailsS​​ervice`使用数据库表）或通过`ClientDetailsManager`接口（`ClientDetailsS​​ervice`的两个实现也都实现了）来在运行的应用程序中更新客户端详细信息。

::: tip
并没有找到`ClientDetailsManager`这个接口

`ClientDetailsS​​ervice`有`InMemoryClientDetailsService`和`JdbcClientDetailsService`两个实现，分别对应内存存储和数据库存储
:::

注意：JDBC服务的schema未随库一起打包（因为您可能想在实践​​中使用太多变化），但是有一个示例可以从github的[测试代码](https://github.com/spring-projects/spring-security-oauth/blob/master/spring-security-oauth2/src/test/resources/schema.sql)开始

上述测试代码如下：

~~~ sql
-- used in tests that use HSQL
create table oauth_client_details (
  client_id VARCHAR(256) PRIMARY KEY,
  resource_ids VARCHAR(256),
  client_secret VARCHAR(256),
  scope VARCHAR(256),
  authorized_grant_types VARCHAR(256),
  web_server_redirect_uri VARCHAR(256),
  authorities VARCHAR(256),
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additional_information VARCHAR(4096),
  autoapprove VARCHAR(256)
);

create table oauth_client_token (
  token_id VARCHAR(256),
  token LONGVARBINARY,
  authentication_id VARCHAR(256) PRIMARY KEY,
  user_name VARCHAR(256),
  client_id VARCHAR(256)
);

create table oauth_access_token (
  token_id VARCHAR(256),
  token LONGVARBINARY,
  authentication_id VARCHAR(256) PRIMARY KEY,
  user_name VARCHAR(256),
  client_id VARCHAR(256),
  authentication LONGVARBINARY,
  refresh_token VARCHAR(256)
);

create table oauth_refresh_token (
  token_id VARCHAR(256),
  token LONGVARBINARY,
  authentication LONGVARBINARY
);

create table oauth_code (
  code VARCHAR(256), authentication LONGVARBINARY
);

create table oauth_approvals (
	userId VARCHAR(256),
	clientId VARCHAR(256),
	scope VARCHAR(256),
	status VARCHAR(10),
	expiresAt TIMESTAMP,
	lastModifiedAt TIMESTAMP
);


-- customized oauth_client_details table
create table ClientDetails (
  appId VARCHAR(256) PRIMARY KEY,
  resourceIds VARCHAR(256),
  appSecret VARCHAR(256),
  scope VARCHAR(256),
  grantTypes VARCHAR(256),
  redirectUrl VARCHAR(256),
  authorities VARCHAR(256),
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additionalInformation VARCHAR(4096),
  autoApproveScopes VARCHAR(256)
);
~~~


### 管理令牌（Managing Tokens)

`AuthorizationServerTokenServices`接口定义管理OAuth 2.0令牌所需的操作。请注意以下几点：

- 创建访问令牌后，必须存储身份验证，以便接受访问令牌的资源以后可以引用它

- 访问令牌用于加载用于授权其创建的身份验证

在创建`AuthorizationServerTokenServices`实现时，您可能要考虑使用DefaultTokenServices，它可以插入许多策略来更改访问令牌的格式和存储。默认情况下，除了将其委派给`TokenStore`的令牌的持久性之外,它通过随机值创建令牌并处理所有事务，。默认存储是[内存中的实现](https://docs.spring.io/spring-security/oauth/apidocs/org/springframework/security/oauth2/provider/token/store/InMemoryTokenStore.html)，但还有其他一些实现。这是对其中每个都有一些讨论的一个描述

- 默认的`InMemoryTokenStore`非常适合单台服务器（即低流量，并且在发生故障时不与备份服务器进行热交换）。大多数项目都可以从此处开始，并且可以在开发模式下以这种方式运行，从而轻松启动没有依赖性的服务器。

- `JdbcTokenStore`是[JDBC实现版本](https://projects.spring.io/spring-security-oauth/docs/JdbcTokenStore)，它将令牌数据存储在关系数据库中。如果可以在服务器之间共享数据库，请使用JDBC版本；如果只有一个，则可以扩展同一服务器的实例；如果有多个组件，则可以使用授权和资源服务器。要使用`JdbcTokenStore`，需要在类路径上使用“ spring-jdbc”。

- 存储的`JSON Web TOKEN（JWT）`版本将有关授权的所有数据编码到令牌本身中（因此根本没有后端存储，这是一个很大的优势）。一个缺点是您不能轻易地撤销访问令牌，因此授予它们的有效期通常很短，并且撤销是在刷新令牌处进行的。另一个缺点是，如果您在令牌中存储了大量用户凭证信息，则令牌会变得很大。从不保留任何数据的意义上讲，`JwtTokenStore`并不是真正的“存储”，但它在翻译`DefaultTokenServices`中的令牌值和身份验证信息之间起着相同的作用。

注意：JDBC服务的schema未随库一起打包（因为您可能想在实践​​中使用太多变化），但是有一个示例可以从github的[测试代码](https://github.com/spring-projects/spring-security-oauth/blob/master/spring-security-oauth2/src/test/resources/schema.sql)开始。确保使用`@EnableTransactionManagement`来防止在创建令牌时客户端应用程序在争用同一行之间发生冲突。还要注意，示例schema具有显式的PRIMARY KEY声明-在并发环境中，这些声明也是必需的。

::: tip

以上管理令牌功能由spring-security-oauth2框架提供

`DefaultTokenServices`是提供的一个默认`AuthorizationServerTokenServices`接口实现

`TokenStore`接口是用来实现令牌持久化，spring-security-oauth2框架提供了`JdbcTokenStore`,`RedisTokenStore`,`JwtTokenStore`,`InMemoryTokenStore`和`JwkTokenStore`五种实现方式

:::

### JWT令牌（JWT Tokens）

如果要使用JWT令牌的话，需要在授权服务器中使用`JwtTokenStore`。资源服务器还需要解码令牌，因此`JwtTokenStore`依赖于`JwtAccessTokenConverter`，并且授权服务器和资源服务器都需要相同的实现。

**默认情况下，令牌已签名**，资源服务器还必须能够验证签名，因此它要么需要与授权服务器相同的对称（签名）密钥（共享密钥或对称密钥）(shared secret, or symmetric key)，要么需要与授权服务器中（公私钥或非对称密钥）的私钥（签名密钥）匹配的公钥（认证密钥）。

授权服务器在`/oauth/token_key`端点上公开公钥（如果有），默认情况下使用访问规则“denyAll()”来保护。您可以通过将标准SpEL表达式注入`AuthorizationServerSecurityConfigurer`中来打开它（例如，“permitAll()”因为它是公钥而已）

要使用`JwtTokenStore`，您需要在类路径上使用**“spring-security-jwt”**（您可以在与Spring OAuth相同的github存储库中找到它，但发布周期不同）

::: tip

`JwtTokenStore`和`JwtAccessTokenConverter`是两个token存储比较重要的对象

`AuthorizationServerSecurityConfigurer`是来自`AuthorizationServerConfigurer`的回调

要使用jwt的话，需要加入spring-security-jwt依赖

:::

### 授权类型（Grant Types）

授权类型是由`AuthorizationEndpoint`提供，并且可以通过`AuthorizationServerEndpointsConfigurer`（来自`AuthorizationServerConfigurer`的回调）进行配置。默认情况下除了密码之外，所有的授权类型都支持 (有关如何打开它的详细信息，请参见下文)。以下属性影响授权类型：

- `authenticationManager`: 通过注入`AuthenticationManager`来打开密码授权

- `userDetailsService`: 如果你注入一个`UserDetailsService`实现或者无论用任何方式进行全局配置这个实现（例如：在`GlobalAuthenticationConfigurerAdapter`中配置），刷新令牌授权（refresh token grant）将包含对用户详细信息的检查，以确保帐户仍然处于活动状态

- `authorizationCodeServices`: 定义针对授权码授权的授权码服务（`AuthorizationCodeServices`的实例）

- `implicitGrantService`: 隐式授权（imlpicit grant）期间管理状态

- `tokenGranter`:  `TokenGranter` (完全控制授权并忽略上述其他属性)

在XML中，授权类型作为`authorization-server`的子元素包含在内。

### 配置端点访问地址（Configuring the Endpoint URLs）

`AuthorizationServerEndpointsConfigurer`（来自`AuthorizationServerConfigurer`的回调）有一个方法`pathMapping()`，有两个参数:

- defaultPath，默认端点（endpoint）URL路径（由框架实现）

- customPath，所需的自定义路径(以"/"开头) 

框架提供的URL路径有：

- `/oauth/authorize`授权端点，存在于`AuthorizationEndpoint`

- `/oauth/token`令牌端点，存在于`TokenEndpoint`

- `/oauth/confirm_access` 用户在此发起授权批准(这个应该是返回授权请求页面的请求)，存在于`WhitelabelApprovalEndpoint`

- `/oauth/error`用于在授权服务器中呈现错误，存在于`WhitelabelErrorEndpoint`

- `/oauth/check_token`资源服务器中用来解码访问令牌，存在于`CheckTokenEndpoint`

- `/oauth/token_key` 如果使用JWT令牌，将公开用于令牌验证的公钥，存在于`TokenKeyEndpoint`

需要注意的是授权端点`/oauth/authorize`（或其映射的替代方法）应使用**Spring Security**进行保护，以便只有经过身份验证的用户才能访问

例如使用一个标准的**Spring Security** WebSecurityConfigurer:

~~~ java
@Override
protected void configure(HttpSecurity http) throws Exception {
	http
		.authorizeRequests().antMatchers("/login").permitAll().and()
	// default protection for all resources (including /oauth/authorize)
		.authorizeRequests()
			.anyRequest().hasRole("USER")
	// ... more configuration, e.g. for form login
}
~~~

注意：如果您的授权服务器也是资源服务器，那么还有另一个优先级较低控制API资源的安全过滤器链。因为请求都被访问令牌保护，你需要使得它们都路径不被由那些主要面向用户（user-facing）过滤器链匹配。因此，请务必包括一个请求匹配器，该匹配器仅从上面的`WebSecurityConfigurer`中选取非API资源

令牌端点`/oauth/token`默认是受保护的，由Spring OAuth的配置中通过支持客户端密钥（client secret）的HTTP Basic authentication，这在XML配置中是无法进行设置的（所以它应该被明确的保护）

在 XML中`<authorization-server/>`元素具有一些属性，可以通过相似的方式用来更改默认端点URL。`/check_token`端点必须显式启用（使用`check-token-enabled`属性）

::: tip

令牌端点保护，简单点说就是在访问`/oauth/token`时，需要在HTTP请求头中增加authentication，在此存放客户端的信息。客户端信息会在`BasicAuthenticationFilter`中获取（如下图）。

`BasicAuthenticationFilter`详细信息可以查看该类的API文档，这里对Authorization的格式做一个简单描述：

Authorization内容由一个身份验证方案`Basic`和一个Base64加密的`username:password`token组合而成

如果用户"Aladdin"，密码"open sesame"，`Aladdin:open sesame`经过Base64编码之后得到的token为`QWxhZGRpbjpvcGVuIHNlc2FtZQ==`

那么Authorization请求头内容应该为`Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==`

:::

![Authentication](https://gitee.com/zengsl/picBed/raw/master/img/20201223152721.png)

## 自定义界面（Customizing the UI）

### 强制使用SSL（Enforcing SSL）

## 自定义错误处理（Customizing the Error Handling）

## 映射用户角色到权限范围（Mapping User Roles to Scopes）


## 资源服务器配置（Resource Server Configuration）

资源服务器（可以与授权服务器或单独的应用程序相同）提供受OAuth2令牌保护的资源。Spring OAuth提供实现此保护的Spring Security认证过滤器，你可以在`@Configuration`配置类上增加`@EnableResourceServer`注解开启此功能，并且如果需要的话可以使用`ResourceServerConfigurer`接口来进行配置。可以配置以下功能：

- `tokenServices`: 定义了令牌服务的bean，`ResourceServerTokenServices`的实例

- `resourceId`: 资源的id（可选，但建议进行设置，并将由身份验证服务器验证）

- 其他资源服务器的扩展点（例如：用于从输入请求中抽取令牌的`tokenExtractor`）

- 保护资源的请求匹配器（默认是保护资源服务器的全部路径）

- 保护资源的访问规则，默认是简单身份认证（plain "authenticated"）

- 其他被Spring Security的HttpSecurity配置器所允许的定制化

`@EnableResourceServer`注解自动添加了一个`OAuth2AuthenticationProcessingFilter`类型的过滤器到Spring Security的过滤器链

在XML中的`<resource-server/>`元素中，将id属性配置为一个servlet过滤器的bean id，过滤就可以手动的被加入到标准的Spring Security的过滤器链中

`ResourceServerTokenServices`是与授权服务器契约的另一半。如果资源服务器和授权服务器是在同一个应用中，同时使用的是`DefaultTokenServices`,那么就不必考虑过多，因为实现了所有所需的接口，并且自动保持了一致。如果资源服务器是分离的应用，那么你必须确保与授权服务器的功能相匹配还需要提供一个知道如何正确解码令牌的`ResourceServerTokenServices`。
与授权服务器一样，您通常可以使用`DefaultTokenServices`，并且选项大多通过`TokenStore`表示（后端存储或本地编码）。另一种选择是`RemoteTokenServices`，它是一个Spring OAuth功能（不是规范的一部分），允许资源服务器通过授权服务器上的HTTP资源解码令牌（`/oauth/check_token`）。
如果资源服务器中没有大量流量，`RemoteTokenServices`将非常方便(所有的请求都会使用授权服务器进行验证)，或者你可以缓存保存token验证的结果。要使用`/oauth/check_token`端点，你需要在`AuthorizationServerSecurityConfigurer`中修改访问规则（默认"denyAll()"）来公开它，如下面一个例子：

~~~ java
@Override
public void configure(AuthorizationServerSecurityConfigurer oauthServer) throws Exception {
	oauthServer.tokenKeyAccess("isAnonymous() || hasAuthority('ROLE_TRUSTED_CLIENT')").checkTokenAccess(
			"hasAuthority('ROLE_TRUSTED_CLIENT')");
}
~~~

在这个例子中同时配置来`/oauth/check_token`和`/oauth/token_key`两个端点（因此，受信任的资源可以获取JWT验证的公钥）。这两个端点都是使用客户端凭证（client credentials）通过HTTP Basic authentication来进行保护的。

### 配置OAuth-Aware表达式处理器（Configuring An OAuth-Aware Expression Handler）

您可能希望利用Spring Security[基于表达式的访问控制](https://docs.spring.io/spring-security/site/docs/3.2.5.RELEASE/reference/htmlsingle/#el-access)。默认情况下，表达式处理程序将在`@EnableResourceServer`中注册
表达式包括#oauth2.clientHasRole、#oauth2.clientHasAnyRole 和 #oath2.denyClient，它们可用于根据oauth客户端的角色提供访问（有关综合列表，请参阅`OAuth2SecurityExpressionMethods`）

## OAuth 2.0 客户端（OAuth 2.0 Client） 

OAuth 2.0客户端机制负责访问其他服务器的OAuth 2.0受保护资源。配置涉及建立用户可能有权访问的相关受保护资源。客户端可能还需要为用户提供存储授权代码和访问令牌的机制 

### 受保护资源配置（Protected Resource Configuration）

受保护资源（或者“远程资源”）可以使用`OAuth2ProtectedResourceDetails`类型的bean定义进行定义。一个受保护资源由以下属性：

- `id`：资源id，id仅由客户端用于查找资源；它从未在 Oauth 协议中使用过。它也被用作beanID 。

- `clientId`：OAuth客户端Id。这是OAuth提供程序标识客户端的ID

- `clientSecret`：与资源关联的机密。默认情况下，没有机密为空

- `accessTokenUri`: 提供获取令牌的OAuth提供程序端点地址

- `scope`：指定对资源的访问范围的字符串的逗号分隔列表。默认情况下，不会指定任何范围。

- `clientAuthenticationScheme`：客户端用于对访问令牌终结点进行身份验证的方案。建议的值："http_basic"和"form"。默认值："http_basic"。参见[OAuth 2规范的第 2.1 节](https://tools.ietf.org/html/draft-ietf-oauth-v2-31#section-2.1)

不同的授予类型具有不同的`OAuth2ProtectedResourceDetails`的具体实现（例如，`ClientCredentialsResource`是针对客户端凭证"client_credentials"的授权类型）。对于需要用户授权的授予类型，还有一个属性：

- `userAuthorizationUri`：如果用户需要授权访问资源，用户将被重定向到该用户。请注意，这并不总是是必需的，具体取决于支持哪些OAuth 2配置文件。

在 XML 中，<resource/>元素可用于创建`OAuth2ProtectedResourceDetails`类型的bean。它具有与上述所有属性匹配的属性。

### 客户端配置

对于OAuth 2.0客户端，使用`@EnableOAuth2Client`简化了配置。做了两件事情：

- 创建过滤器bean（使用ID`oauth2ClientContextFilter`）来存储当前请求和上下文。在请求期间需要进行身份验证时，它会管理对OAuth身份验证uri的重定向

- 在请求范围内创建类型为`AccessTokenRequest`的bean。这可以通过授权码（或隐藏式）授予客户端来防止与单个用户相关的状态发生碰撞

过滤器必须连接到应用程序中（例如，使用Servlet初始化器或`web.xml`为具有相同名称的`DelegatingFilterProxy`配置）

`AccessTokenRequest`可以在`OAuth2RestTemplate` 中像这样使用:

~~~ java
@Autowired
private OAuth2ClientContext oauth2Context;

@Bean
public OAuth2RestTemplate sparklrRestTemplate() {
	return new OAuth2RestTemplate(sparklr(), oauth2Context);
}
~~~

OAuth2ClientContext放置在会话范围内，以保持不同用户的状态分开。如果没有这些，您必须自己在服务器上管理等效的数据结构，将传入请求映射到用户，并关联每个用户与`OAuth2ClientContext`的单独实例。

在XML中，有一个`<client/>`具有 id 属性的元素 - 这是Servlet`过滤器`的bean ID，必须像`@Configuration`中的情况一样映射到`DelegatingFilterProxy`（同名）。

### 访问受保护资源（Accessing Protected Resources）

### 在客户端中保留令牌（Persisting Tokens in a Client）

## 外部OAuth2提供程序客户端的自定义

Customizations for Clients of External OAuth2 Providers


