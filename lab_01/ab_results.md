# Без балансировки и без кеширования 10000 
```bash
$ ab -c 10 -n 10000 http://127.0.0.1:81/api/v1/users
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        buydevice
Server Hostname:        127.0.0.1
Server Port:            81

Document Path:          /api/v1/users
Document Length:        4835 bytes

Concurrency Level:      10
Time taken for tests:   14.768 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      50650000 bytes
HTML transferred:       48350000 bytes
Requests per second:    677.16 [#/sec] (mean)
Time per request:       14.768 [ms] (mean)
Time per request:       1.477 [ms] (mean, across all concurrent requests)
Transfer rate:          3349.43 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       1
Processing:     9   15   5.3     13     131
Waiting:        9   15   5.3     13     131
Total:          9   15   5.3     13     131

Percentage of the requests served within a certain time (ms)
  50%     13
  66%     14
  75%     14
  80%     15
  90%     18
  95%     25
  98%     31
  99%     33
 100%    131 (longest request)

```

# С балансировкой и без кеширования 10000
```bash
$ ab -c 10 -n 10000 http://127.0.0.1:81/api/v1/users
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        buydevice
Server Hostname:        127.0.0.1
Server Port:            81

Document Path:          /api/v1/users
Document Length:        4835 bytes

Concurrency Level:      10
Time taken for tests:   9.373 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      50650000 bytes
HTML transferred:       48350000 bytes
Requests per second:    1066.88 [#/sec] (mean)
Time per request:       9.373 [ms] (mean)
Time per request:       0.937 [ms] (mean, across all concurrent requests)
Transfer rate:          5277.10 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:     2    9   7.7      8     102
Waiting:        2    9   7.7      8     102
Total:          2    9   7.7      8     102

Percentage of the requests served within a certain time (ms)
  50%      8
  66%     14
  75%     15
  80%     15
  90%     17
  95%     19
  98%     28
  99%     34
 100%    102 (longest request)

```

# Без балансировки и с кешированием 10000
```bash
$ ab -c 10 -n 10000 http://127.0.0.1:81/api/v1/users
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        buydevice
Server Hostname:        127.0.0.1
Server Port:            81

Document Path:          /api/v1/users
Document Length:        5241 bytes

Concurrency Level:      10
Time taken for tests:   0.398 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      54910040 bytes
HTML transferred:       52410000 bytes
Requests per second:    25107.08 [#/sec] (mean)
Time per request:       0.398 [ms] (mean)
Time per request:       0.040 [ms] (mean, across all concurrent requests)
Transfer rate:          134631.92 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:     0    0   3.9      0     136
Waiting:        0    0   3.9      0     136
Total:          0    0   3.9      0     136

Percentage of the requests served within a certain time (ms)
  50%      0
  66%      0
  75%      0
  80%      0
  90%      0
  95%      0
  98%      0
  99%      0
 100%    136 (longest request)

```

# С балансировкой и с кешированием 10000
```bash
$ ab -c 10 -n 10000 http://127.0.0.1:81/api/v1/users
This is ApacheBench, Version 2.3 <$Revision: 1807734 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        buydevice
Server Hostname:        127.0.0.1
Server Port:            81

Document Path:          /api/v1/users
Document Length:        4835 bytes

Concurrency Level:      10
Time taken for tests:   0.307 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      50850000 bytes
HTML transferred:       48350000 bytes
Requests per second:    32520.54 [#/sec] (mean)
Time per request:       0.307 [ms] (mean)
Time per request:       0.031 [ms] (mean, across all concurrent requests)
Transfer rate:          161491.14 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:     0    0   0.0      0       0
Waiting:        0    0   0.0      0       0
Total:          0    0   0.0      0       1

Percentage of the requests served within a certain time (ms)
  50%      0
  66%      0
  75%      0
  80%      0
  90%      0
  95%      0
  98%      0
  99%      0
 100%      1 (longest request)
```