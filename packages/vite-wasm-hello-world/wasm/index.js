// golang
import wasmUrl from './main.wasm?url';
import './wasm_go';

if (!WebAssembly.instantiateStreaming) { // polyfill
  WebAssembly.instantiateStreaming = async (resp, importObject) => {
    const source = await (await resp).arrayBuffer();
    return await WebAssembly.instantiate(source, importObject);
  };
}

(async () => {
  const go = new Go();
  const goWasmUrl = fetch(wasmUrl);
  const { instance, module } = await WebAssembly.instantiateStreaming(goWasmUrl, go.importObject);

  console.log('test');
  await go.run(instance);

  // globalThis.MyGoFunc();
})();
