---
---
# 算法

## 公式定理

### Master公式

master公式：也叫主定理。它提供了一种通过渐近符号表示递推关系式的方法。

应用Master定理可以很简便的求解递归方程。

$$
T [n] = a*T[n/b] + O (N^d)
$$
①当d<log(b,a)时，时间复杂度为O(n^(logb a))

②当d=log(b,a)时，时间复杂度为O((n^d)*logn)

③当d>log(b,a)时，时间复杂度为O(n^d)

### HyperLogLog

https://www.yuque.com/abser/aboutme/nfx0a4