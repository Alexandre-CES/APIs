import { Request, Response } from 'express';
import fs from 'fs';

export default class OrganizerController {
  public organize(req: Request, res: Response){
    const filePath = req.body.filePath;

    if (!fs.existsSync(filePath)){ 
      res.status(400).send('Arquivo não encontrado.'); 
    } 
    
    res.send(filePath);
  }
}
