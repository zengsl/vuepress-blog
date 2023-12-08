---
order: 2
----
# 匿名权限

## 匿名权限配置

- 定义匿名权限名称

`<sec:anonymous granted-authority="A_ANONYMOUS" />`A_ANONYMOUS为权限名


- 资源与匿名权限做好关联

如果未登录属于匿名权限，那么`AnonymousAuthenticationFilter`会为当前用户设置匿名权限的上下文，访问资源时会根据当前资源url查找其对应的权限，然后将拿到的资源对应的权限和匿名用户上下文中的权限名进行匹配。如果命中则表示有权限。

所以当前资源必须配置有匿名权限`A_ANONYMOUS`


