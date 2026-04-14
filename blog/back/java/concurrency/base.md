---
order: 2
date: 2020-09-10
---
# java多线程-基础
##  一、简介

​	**什么是并发？**

## 二、java实现方式

### 		1、继承Thread类

~~~ java
class TestThread implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if (i % 2 == 0) {
                System.out.println(Thread.currentThread().getName() + " :" + i);
            }
        }
    }
}
// 调用
TestThread myThread = new TestThread();
Thread t1 = new Thread(myThread);
t1.start();
~~~



### 		2、实现Runnable接口

~~~ java
class Window1 implements Runnable {
    private static int ticket = 100;
    @Override
    public void run() {
        while (true) {
            if (ticket > 0) {
                System.out.println(Thread.currentThread().getName() + ":卖票， 票号为：" + ticket);
                ticket--;
            } else {
                break;
            }
        }
    }
}
// 调用
Window1 window1 = new Window1();
Thread t1 = new Thread(window1);
t1.setName("线程1");
t1.start();
~~~



### 		3、实现Callable接口

~~~ java
class NumThread implements Callable {
    @Override
    public Object call() throws Exception {
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
                System.out.println(i);
                sum += i;
            }
        }
        return sum;
    }
}
// 调用
NumThread numThread = new NumThread();
// 创建FutureTask来接收线程
FutureTask futureTask = new FutureTask(numThread);
// 开启线程
new Thread(futureTask).start();
try {
    // 获取返回值
    Object sum = futureTask.get();
    System.out.println("总和为：" + sum);
} catch (InterruptedException e) {
    e.printStackTrace();
} catch (ExecutionException e) {
    e.printStackTrace();
}
~~~

### 		4、线程池

~~~ java
// Executors.newFixedThreadPool 除该方法之外其他创建线程的方法
// 比如：newFixedThreadPool、newScheduledThreadPool等。
ExecutorService service = Executors.newFixedThreadPool(10);
service.execute(new NumThread2());
service.execute(new NumThread3());
// service.submit(); // 适用于有返回值的 实现Callable接口的线程
service.shutdown();
~~~



​	**3、4是在JDK5.0开始后新增对线程创建方式**

##  三、线程通信

使用方法wait()、notify()和notifyAll()
wait()：执行方法 当前线程进入阻塞状态，释放同步监视器
notify()：一旦试行次方法 就会唤醒被wait的线程，如果有多个被wait就唤醒优先级高对线程。
notifyAll()：唤醒所有被wait对线程

1. **wait()、notify()、notifyAll(),此通信方法必须使用在同步代码块或者同步方法中。如果是使用lock的方式则有其他通信方法。**

2. **wait()、notify()、notifyAll(),此三个方法对调用者必须是同步代码块或者同步方法中同步代码监视器。 否则会出现java.lang.IllegalMonitorStateException异常**

   ~~~ java
   class Number implements Runnable {
   
       private int number = 1;
       private Object obj = new Object();
   
       @Override
       public void run() {
           while (true) {
               synchronized (obj) {
                   obj.notify();
                   if (number <= 100) {
                       try {
                           Thread.sleep(1000);
                       } catch (InterruptedException e) {
                           e.printStackTrace();
                       }
                       System.out.println(Thread.currentThread().getName() + ":" + number);
                       number++;
                       try {
                           // 阻塞线程
                           obj.wait();
                       } catch (InterruptedException e) {
                           e.printStackTrace();
                       }
                   } else {
                       break;
                   }
               }
           }
       }
   }
   ~~~

   

sleep 和 wait的异同？
相同点：一旦执行方法，都可以使得当前线程进入阻塞状态。
不同点：

- 两个方法声明对位置不同：Thread类中声明的sleep，Object类中声明wait
- 调用的要求不同：sleep可以在任何对场景调用，wait必须使用在同步代码块中，由同步代码监视器Monitor来调用。
- 关于是否释放同步监视器：如果两个方法都是使用在同步代码块或者同步方法中,sleep不会释放。

经典问题：生产者消费者问题



### 四、JDK5.0后新增对线程创建方式

1、实现Callable接口

1.1. 创建一个实现Callable对实现类
1.2. 实现call方法
1.3. 创建Callable接口实现类的对象
1.4. 将此Callable接口实现类的对象作为参数穿肚到FutureTask构造器中
1.5. 将FutureTask对象作为参数放入Thread构造器参数，创建Thread对象，并且调用start()
1.6. 获取返回值futureTask.get();

~~~ java
public class ThreadNew {
    public static void main(String[] args) {
        NumThread numThread = new NumThread();
        FutureTask futureTask = new FutureTask(numThread);
        new Thread(futureTask).start();
        try {
            Object sum = futureTask.get();
            System.out.println("总和为：" + sum);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}

class NumThread implements Callable {
    @Override
    public Object call() throws Exception {
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
                System.out.println(i);
                sum += i;
            }
        }
        return sum;
    }
}
~~~

与使用Runnable接口相比，Callable功能更强大

- 可以有返回值
- 可以抛出异常
- 支持泛型对返回值
- 需要借助FutureTask类，比如获取返回结果

2、使用线程池

~~~ java
ExecutorService service = Executors.newFixedThreadPool(10);
service.execute(new NumThread2());
service.execute(new NumThread3());
// service.submit(); // 适用于有返回值的 实现Callable接口的线程
service.shutdown();
~~~

优点：

- 提高响应速度(节约创建线程的时间，提前创建好)
- 降低资源消耗(重复利用线程池中的线程，避免每次都创建)
- 便于线程的统一管理

