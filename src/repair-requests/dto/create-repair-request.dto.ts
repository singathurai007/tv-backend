import {
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateRepairRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsString()
  @Matches(/^[0-9]{10,15}$/, {
    message: 'Phone number must contain 10 to 15 digits',
  })
  phone!: string;

  @IsIn([
    'Sony',
    'Samsung',
    'LG',
    'Panasonic',
    'Mi',
    'Haier',
    'Micromax',
    'Vu',
    'Thomson',
    'Toshiba',
    'Sharp',
    'Intex',
  ])
  tv_brand!: string;

  @IsIn([
    'Peelamedu',
    'Gandhipuram',
    'RS Puram',
    'Saravanampatti',
    'Singanallur',
    'Saibaba Colony',
    'Ganapathy',
    'Vadavalli',
    'Town Hall',
    'Race Course',
    'Ukkadam',
    'Sundarapuram',
  ])
  area!: string;

  @IsIn([
    'TV Repair',
    'LED TV Repair',
    'Smart TV Repair',
    'TV Installation',
    'Other',
  ])
  service_type!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  issue_description!: string;
}