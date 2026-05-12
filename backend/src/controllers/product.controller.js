import { query } from '../config/db.js';
import { createError } from '../middleware/errorHandler.js';

// GET /api/products
export async function listProducts(req, res, next) {
  try {
    const { category, brand, search, page = 1, limit = 12 } = req.query;
    const conditions = [];
    const params = [];
    let paramIndex = 1;

    if (category) {
      conditions.push(`category = $${paramIndex++}`);
      params.push(category);
    }

    if (brand) {
      conditions.push(`brand ILIKE $${paramIndex++}`);
      params.push(brand);
    }

    if (search) {
      conditions.push(`(name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`);
      params.push(`%${search}%`);
      paramIndex++;
    }

    const where = conditions.length > 0
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    const offset = (Number(page) - 1) * Number(limit);

    const countResult = await query(
      `SELECT COUNT(*) FROM products ${where}`,
      params
    );

    const result = await query(
      `SELECT * FROM products ${where}
       ORDER BY created_at DESC
       LIMIT $${paramIndex++} OFFSET $${paramIndex}`,
      [...params, Number(limit), offset]
    );

    res.json({
      products: result.rows,
      total: Number(countResult.rows[0].count),
      page: Number(page),
      limit: Number(limit),
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/products/:id
export async function getProduct(req, res, next) {
  try {
    const result = await query(
      'SELECT * FROM products WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      throw createError('Product not found', 'not_found', 404);
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

// POST /api/products (admin only)
export async function createProduct(req, res, next) {
  try {
    const { name, brand, price, description, image_url, category, sizes, stock } = req.body;

    if (!name || !brand || !price || !category) {
      throw createError('name, brand, price, and category are required', 'validation', 400);
    }

    const result = await query(
      `INSERT INTO products (name, brand, price, description, image_url, category, sizes, stock)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [name, brand, price, description || null, image_url || null, category, JSON.stringify(sizes || []), stock || 0]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

// PUT /api/products/:id (admin only)
export async function updateProduct(req, res, next) {
  try {
    const { name, brand, price, description, image_url, category, sizes, stock } = req.body;

    const result = await query(
      `UPDATE products
       SET name = COALESCE($1, name),
           brand = COALESCE($2, brand),
           price = COALESCE($3, price),
           description = COALESCE($4, description),
           image_url = COALESCE($5, image_url),
           category = COALESCE($6, category),
           sizes = COALESCE($7, sizes),
           stock = COALESCE($8, stock),
           updated_at = NOW()
       WHERE id = $9
       RETURNING *`,
      [name, brand, price, description, image_url, category, sizes ? JSON.stringify(sizes) : null, stock, req.params.id]
    );

    if (result.rows.length === 0) {
      throw createError('Product not found', 'not_found', 404);
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/products/:id (admin only)
export async function deleteProduct(req, res, next) {
  try {
    const result = await query(
      'DELETE FROM products WHERE id = $1 RETURNING id',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      throw createError('Product not found', 'not_found', 404);
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
}
