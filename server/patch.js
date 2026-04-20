import buffer from "buffer";

// Patch for Node v25+ where SlowBuffer is removed but required by older dependencies like jsonwebtoken -> buffer-equal-constant-time
if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = buffer.Buffer;
}
global.SlowBuffer = buffer.Buffer;
