// Copyright (C) 2020 Alessandro Segala (ItalyPaleAle)
// License: MIT

package main

// Import the package to access the Wasm environment
import (
	"syscall/js"
)

// Main function: it sets up our Wasm application
func main() {
	// Define the function "MyGoFunc" in the JavaScript scope
	js.Global().Set("MyGoFunc", MyGoFunc())
	// Prevent the function from returning, which is required in a wasm module
	select {}
}

// MyGoFunc returns a JavaScript function
func MyGoFunc() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		// Return a JS dictionary with two keys (of heterogeneous type)
		return map[string]interface{}{
			"hello":  "world",
			"answer": 42,
		}
	})
}