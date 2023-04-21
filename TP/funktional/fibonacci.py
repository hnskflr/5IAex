import time

def fib(n):
    if n <= 1:
        return n

    return fib(n - 1) + fib(n - 2)

def fib2(n, h0, h1):
    if n < 1:
        return h0
    
    return fib2(n - 1, h1, h0 + h1) 

t1 = time.time()
print(fib(50))
t1 = time.time() - t1

t2 = time.time()
print(fib2(50, 0, 1))
t2 = time.time() - t2

print(t1)
print(t2)
