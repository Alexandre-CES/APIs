import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { FileTypes } from './interfaces/file-types.interface';

export default class OrganizerController {
  public async organize(req: Request, res: Response) {
    const reqFilePath = req.body.filePath;

    if (!fs.existsSync(reqFilePath)) { 
      return res.status(404).send('Path not found'); 
    }

    try {
      const data = await fs.promises.readdir(reqFilePath);

      // read file-types.json
      const jsonFilePath = path.join(process.cwd(), 'src/modules/files/organizer/data/file-types.json');
      const jsonData = await fs.promises.readFile(jsonFilePath);
      const fileTypes: FileTypes = JSON.parse(jsonData.toString());

      for (const file of data) {
        const filePath = path.join(reqFilePath, file);
        const stats = await fs.promises.stat(filePath);

        // if isn't a directory
        if (stats.isFile()) {
          const ext = path.extname(file).toLowerCase();
          let moved = false;

          for (const directory in fileTypes) {
            //stop loop if there are repeated extensions in different directories in the json file
            if (moved) break; 

            const fileExtensions: string[] = fileTypes[directory];

            if (fileExtensions.includes(ext)) {
              const dirPath = path.join(reqFilePath, directory);

              //create dirpath if doesn't exist 
              if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
              }

              //copy file
              const destFilePath = path.join(dirPath, file);
              await fs.promises.copyFile(filePath, destFilePath);

              //verify if copy exist before delete the original one
              const copiedStats = await fs.promises.stat(destFilePath);
              if (copiedStats.size === stats.size) {
                await fs.promises.unlink(filePath);
                moved = true;
              }
            }
          }
        }
      }

      res.send('Files organized successfully.');
    } catch(err) {
      if (err instanceof Error && 'code' in err) { 
        const errorCode = (err as any).code;
        switch (errorCode) { 
          case 'ENOENT': 
            res.status(404).send('File or directory not found.'); 
            break; 
          case 'EACCES': 
            res.status(403).send('Permission denied.'); 
            break; 
          default: 
            res.status(500).send('Internal server error.'); 
            break; 
        } 
      } else { 
        res.status(500).send('Unknown error.'); 
      }
    }
  }
}
