import { pool } from "../db.js";
import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

const { sign, decode, verify } = jsonwebtoken;

export const getSavings = async (req: Request, res: Response) => {
	try {
		const [rows] = await pool.query(`SELECT 
		gasto.gasto_id, 
		gasto.concepto, 
		gasto.usuario_id,
		gasto.alta, 
		gasto.importe, 
		usuario.nombre
		FROM gasto 
		INNER JOIN usuario ON gasto.usuario_id = usuario.usuario_id`);
		res.send(rows);
	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong.'
		})
	}
};

export const createSaving = async (req: Request, res: Response) => {
	const { concepto, usuario_id, alta, importe } = req.body;

	// Validar datos de entrada
	if (!concepto || !usuario_id || !alta || !importe) {
		return sendResponse(res, 400, 'Faltan datos obligatorios', { authorized: false });
	}

	try {
		const [rows]: any = await pool.query('INSERT INTO gasto (concepto, usuario_id, alta, importe) VALUES (?, ?, ?, ?)', [concepto, usuario_id, alta, importe]);

		// let gasto = {
		// 	id: rows.insertId,
		// 	usuario_id,
		// 	alta,
		// 	importe
		// }

		return sendResponse(res, 200, 'Guardado');

	} catch (error) {
		return res.status(500).json({
			message: error
		})
	}
};

export const updateSaving = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { concepto, usuario_id, alta, importe } = req.body;

	console.log(concepto, usuario_id, alta, importe)
  
	// Validar datos de entrada
	if (!concepto || !usuario_id || !alta || !importe) {
	  return sendResponse(res, 400, 'Faltan datos obligatorios');
	}
  
	try {
	  const [result]: any = await pool.query(`UPDATE gasto SET 
		concepto = IFNULL(?, concepto), 
		usuario_id = IFNULL(?, usuario_id), 
		alta = IFNULL(?, alta), 
		importe = IFNULL(?, importe) 
		WHERE gasto_id = ?`, [concepto, usuario_id, alta, importe, id]);

	  if (result.affectedRows === 0) return res.status(404).json({
		message: 'Gasto no encontrado'
	  });
	  const [rows]: any = await pool.query('SELECT * FROM gasto WHERE gasto_id = ?', [id]);

	  return sendResponse(res, 200, rows[0]);

	} catch (error) {
	  return res.status(500).json({
		message: 'Algo salió mal'
	  });
	}
  };  

export const deleteSaving = async (req: Request, res: Response) => {
	try {
		const [result]: any = await pool.query('DELETE FROM gasto WHERE gasto_id = ?', [req.params.id]);
		if (result.affectedRows <= 0) return res.status(404).json({
			message: 'Gasto no encontrado'
		})

		return sendResponse(res, 204, 'Gasto eliminado');

	} catch (error) {
		return res.status(500).json({
			message: 'Error eliminando el gasto'
		})
	}

};

const sendResponse = (res: any, statusCode: number, message: string, data: any = {}) => {
	res.status(statusCode).json({
	  message,
	  ...data
	});
  };