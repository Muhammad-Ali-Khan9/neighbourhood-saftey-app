export class CreateReportIncidentDto {
  type: string;
  description: string;
  longitude: number;
  latitude: number;
  location: string;
  datetime: Date;
  imageUrl: string;
  userId: number;
  images: any;
}
