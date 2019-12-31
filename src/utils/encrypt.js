import { JSEncrypt } from 'jsencrypt'

const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCiR+TyuZ0xfiBM0JuaQ49BG+pM
jwJYzzeliGbHB0UAgf/G7Y5pMk9VbudyAWDZjinoRSgSTMWgK6X0rkpO4T1bsMzm
MR0jgc6qQaRbzr2AHB9FsUIoRDjCekRK/ScmvSg80o361/jLo2grG7eUrjwyziuE
1jLZgtEAoFZ+PaStjQIDAQAB`

const privateKey = `MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAN1CXyESb2fPfqvQ
cDpTzdk9NZTrP6OPNlWb3cEf6hkEgEW8RGjXqmZB7hqmP78T31xI6Cvi9lP4Qejd
SgNd0/HiZDO5xNnbDhUzbuyCqYOjUoLBTMkSgaIH/kgnXgIDLDYkBpAG+3zBvwUu
9U9STHGjN/Zsg1SVBHijqFQPEa4PAgMBAAECgYBLHj+B0Op1yiJtXqTbiJw4huls
F7pRY0vFINfWu2kU+Uw7YMGw/pdhhDy8W3kE/FA22qHIVJPgykZGMurv3akYskRh
T4TdkgL2iUewf12Vc8kjNeMpWJu2T6BXeS+QZoPmgtykm5hKh7Er5zwkT0odmn4a
+3YlwgVqehS8BRH+4QJBAPmeGMAAdMrqQU406Mjaou1Jq3GUa9yb3ace+RrXrsq9
/1lzoQSYJeUG+l6A5P4+rPsyl+L9GuXASClf2rR0dtcCQQDi6qbuX+RlqqTtO1/x
VVKxZwmgDFFiqkulZGqHn3VGsavRU3Oksu8JIlASy63fc3HPEwtDt96arknXgrzB
kPOJAkA0TXAaKv5N1i/A100/aLBiz+Dgd5zyKKaU8eR4P2EckhsC/ztp3wdxqbik
PJW+wBs2ty8kHKyaH2P/Z1pIHW8ZAkB4IO+kzKE2bWOIr+E3+wqfHkRLNZo0WKFZ
etKm3/UPKuoiFELpk0zWkhLAEJII9K3wiU1yWToAu3oeHHlfJCS5AkEAn2FrRjKc
mZbD39KeUE7nehDmC0HDSrZA2QxPqfhvlKg/LsskkNl076uNXR2EZY/xpYr71goU
AVu+/t/OFgTC0g==`

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}
