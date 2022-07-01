import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    return await this.repository.findOne({
      relations: ['games'],
      where:
        { id: user_id }
    });
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const queryValue = 'SELECT * FROM USERS ORDER BY first_name ASC;';
    return await this.repository.query(queryValue);
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const queryValue = 'SELECT * FROM USERS WHERE LOWER(first_name)=LOWER($1) AND LOWER(last_name)=LOWER($2) ;';
    return await this.repository.query(queryValue, [first_name, last_name]);
  }
}
