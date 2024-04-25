# WebAssembly Build Guide

## test requirement

- os : MAC 14.0(23A344)
- go: go version go1.22.2 darwin/arm64
- node: v21.5.0

## wasm_exec.js

browser에서 wasm를 실행하기 위한 스크립트

wasm 확인

wasm 은 기본 설치 위치 하위에 포함되어 있습니다.

```sh
// go 설치 위치 확인
$ go env GOROOT
/usr/local/go
```

위 명령으로 GO 설치 위치를 확인할 수 있습니다. (저의 경우 기본 위치인 /usr/local/go 입니다.)

설치위치 하위 디렉토리에 "/misc/wasm/wasm_exec.js" 파일이 있는지 확인 합니다.

```sh
$ ls -alh $(go env GOROOT)/misc/wasm/wasm_exec.js
```

wasm_exec.js 는 ​GO 코드를 호출하기 위한 라이브러리 입니다.

new GO() 생성자를 사용 가능하게 되어 go 코드를 호출할 수 있게 됩니다.

이 wasm_exec.js 파일을 \*.wasm 파일이 위치한 곳으로 복사 합니다.

```sh
$ cp $(go env GOROOT)/misc/wasm/wasm_exec.js .
```

## golang

```sh
GOOS=js GOARCH=wasm go build -o public/main.wasm sample.go
```

### reference

- https://m.blog.naver.com/sory1008/221794436126
