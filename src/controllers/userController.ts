import { pool } from "../db";
import jsonwebtoken from 'jsonwebtoken';
import { Request, Response } from 'express';

const { sign, decode, verify } = jsonwebtoken;

export const getUsers = async (_req: Request, res: Response) => {
	try {
		const [rows] = await pool.query('SELECT * FROM usuario');
		res.send(rows);
	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong.'
		})
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const [rows]: any = await pool.query('SELECT * FROM usuario WHERE idusuario = ?', [req.params.id]);
		if (rows.length <= 0) return res.status(404).json({
			message: 'User not found'
		})
		res.send(rows);
	} catch (error) {
		return res.status(500).json({
			message: 'User not found'
		})
	}
};

export const createUser = async (req: Request, res: Response) => {
	const { nombre, usuario, password } = req.body;

	try {
		const [rows] = await pool.query('INSERT INTO usuario (nombre, usuario, password) VALUES (?, ?, ?)', [nombre, usuario, password]);
		
		const insertedUserId = rows.toString;

		res.send({
			id: insertedUserId,
			nombre,
			usuario
		});
	} catch (error) {
		return res.status(500).json({
			message: 'User not found'
		})
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { nombre, usuario, password } = req.body;

	try {
		//IFNULL hace que no se modifique el valor si viene nulo - para actualizar solo algunos campos
		const [result]: any = await pool.query('UPDATE usuario SET nombre = IFNULL(?, nombre), usuario = IFNULL(?, usuario), password = IFNULL(?, password) WHERE idusuario = ?', [nombre, usuario, password, id]);
		
		if ((result as any).length === 0) {
			return res.status(404).json({
				message: 'User not found'
			})
		 }

		const [rows] = await pool.query('SELECT * FROM usuario WHERE idusuario = ?', [id]);
		//res.send(rows[0]);

		if ((rows as any).length === 1) {
			return res.send(rows as any);
		 }

	} catch (error) {
		return res.status(500).json({
			message: 'User not found'
		})
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const [result]: any = await pool.query('DELETE FROM usuario WHERE idusuario = ?', [req.params.id]);
		if (result.affectedRows <= 0) return res.status(404).json({
			message: 'User not found'
		})
		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({
			message: 'User not found'
		})
	}

};


export const authUser = async (req: Request, res: Response) => {
  const { usuario, password } = req.body;

  // Validar datos de entrada
  if (!usuario || !password) {
    return sendResponse(res, 400, 'Usuario y contraseña son requeridos', { authorized: false });
  }

  const token = jsonwebtoken.sign({ id: usuario }, process.env.JWT_SECRET || 'defaultSecret', {
    // expiresIn: process.env.JWT_EXPIRES_IN,
  });

  try {
    const [rows]: any = await pool.query('SELECT * FROM usuario WHERE nombre = ? AND contrasena = ?', [usuario, password]);
    
    if (rows.length <= 0) {
      return sendResponse(res, 404, 'Usuario no encontrado', { authorized: false });
    }

    sendResponse(res, 200, 'Autorizado', {
      user: usuario,
      authorized: true,
      token
    });
  } catch (error) {
    return sendResponse(res, 500, 'Error interno del servidor', { error: (error as Error).message  });
  }
};


const sendResponse = (res: any, statusCode: number, message: string, data: any = {}) => {
	res.status(statusCode).json({
	  message,
	  ...data
	});
  };
  