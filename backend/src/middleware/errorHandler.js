export function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${err.message}`);

  if (err.type === 'validation') {
    return res.status(400).json({ error: err.message });
  }

  if (err.type === 'not_found') {
    return res.status(404).json({ error: err.message });
  }

  if (err.type === 'forbidden') {
    return res.status(403).json({ error: err.message });
  }

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
}

export function createError(message, type, status) {
  const err = new Error(message);
  err.type = type;
  err.status = status;
  return err;
}
