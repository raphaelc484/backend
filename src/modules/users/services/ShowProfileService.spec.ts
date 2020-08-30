import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpadateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    //
    showProfile = new ShowProfileService(fakeUserRepository);
    //
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Ale is back',
      email: 'alequerBeber@vamologo.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Ale is back');
    expect(profile.email).toBe('alequerBeber@vamologo.com');
  });
  it('should not be able to show the profile from a non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
