## Steps To Setup Physical Android Device

1. Go to settings > developer options > Enable Wireless Debugging
2. Search for IpAddress:port in Pair With Device Option
3. Run in terminal:

```
adb pair IpAddress:port
```

4. Enter pairing code from device
5. Now, search for IpAdress:port in wireless debugging screen, port in this one will be different from the port in above address
6. Run in terminal:

```
adb pair IpAddress:port
```

Reference: https://developer.android.com/tools/adb#wireless-adb-android-11
