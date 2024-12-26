import { Request, Response } from 'express';
import { OrganizerService } from './organizer.service';
import { PathService } from '../path/path.service';

export class OrganizerController {
  constructor (
    private readonly organizerService: OrganizerService,
    private readonly pathService: PathService
  ){}

  public async organize(req: Request, res: Response) {
    const result = await this.organizerService.organize(
      this.pathService.getDirPath(),
      req.body.customJson
    );

    res.status(result.status).send(result.body);
  }
}
