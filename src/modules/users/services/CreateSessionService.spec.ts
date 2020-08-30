import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';
import CreateSessionService from './CreateSessionService';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let sessionUser: CreateSessionService;

describe('SessionUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    sessionUser = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a session', async () => {
    const user = await fakeUserRepository.create({
      name: 'Ale',
      email: 'ale@boraBeber.com',
      password: '121233',
    });

    const response = await sessionUser.execute({
      email: 'ale@boraBeber.com',
      password: '121233',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create a session with non existing user', async () => {
    expect(
      sessionUser.execute({
        email: 'ale@boraBeber.com',
        password: '121233',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session with a wrong password', async () => {
    await fakeUserRepository.create({
      name: 'Ale',
      email: 'ale@boraBeber.com',
      password: '121233',
    });

    await expect(
      sessionUser.execute({
        email: 'ale@boraBeber.com',
        password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
