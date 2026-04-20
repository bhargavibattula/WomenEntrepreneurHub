// Patch for Node v25+ where SlowBuffer is removed but required by older dependencies like jsonwebtoken -> buffer-equal-constant-time
global.SlowBuffer = Buffer;
