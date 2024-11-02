import { Request, Response } from 'express';
import { OrganizerService } from './organizer.service';

export class OrganizerController {
  constructor (private readonly organizerService: OrganizerService){}

  public async organize(req: Request, res: Response) {
    const result = await this.organizerService.organize(req.body.filePath);

    res.status(result.status).send(result.message);
  }
}
