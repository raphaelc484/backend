import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';
// import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';
import UpdateProfileUserService from './UpdateProfileUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileUserService;

describe('UpadateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    //
    updateProfile = new UpdateProfileUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    //
  });

  it('should be able to update profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Ale is back',
      email: 'alequerBeber@vamologo.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Joe Doe',
      email: 'joeDoe@test.com',
    });

    expect(updateUser.name).toBe('Joe Doe');
    expect(updateUser.email).toBe('joeDoe@test.com');
  });

  it('should not be able to update the profile from a non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'Ale is back',
      email: 'alequerBeber@vamologo.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'test',
      email: 'test@example.com',
      password: '123456',
    });

    expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joe Doe',
        email: 'alequerBeber@vamologo.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Ale is back',
      email: 'alequerBeber@vamologo.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Joe Doe',
      email: 'joeDoe@test.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old_password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Ale is back',
      email: 'alequerBeber@vamologo.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joe Doe',
        email: 'joeDoe@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old_password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Ale is back',
      email: 'alequerBeber@vamologo.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joe Doe',
        email: 'joeDoe@test.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
