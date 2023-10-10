import {
  AccountProfile,
  ArbitraryState,
  CACHE_CONFIG,
  CacheStoreName,
} from '@daohaus/utils';
import { getProfileForAddress } from '@daohaus/profile-data';

import { HAUS_RPC } from '@daohaus/keychain-utils';

const localforage = import('localforage').then(async (localforage) => {
  // workaround for https://github.com/localForage/localForage/issues/1038
  if (typeof window === 'object') await localforage.default.ready();
  return localforage.default;
});

export const getProfileStore = async () => {
  const local = await localforage;
  return (await local.getItem(
    CacheStoreName.MEMBERS_PROFILE
  )) as ArbitraryState;
};

export const getCachedProfile = async ({ address }: { address: string }) => {
  const abiStore = await getProfileStore();
  const profile = abiStore?.[address] as AccountProfile & {lastUpdated: string} | undefined;
  return profile;
};

const addProfile = ({
  profileStore,
  address,
  profile,
}: {
  profileStore: ArbitraryState;
  address: string;
  profile: AccountProfile;
}) => {
  return {
    ...profileStore,
    [address]: {
      ...profileStore[address],
      ...profile,
      // This could be used to expire cache periodically and update profiles
      lastUpdated: new Date().getTime(),
    },
  };
};

export const cacheProfile = async ({
  address,
  profile,
}: {
  address: string;
  profile: AccountProfile;
}) => {
  const profileStore = await getProfileStore();
  const newStore = addProfile({
    profileStore,
    address,
    profile,
  });
  const local = await localforage;

  try {
    await local.setItem(CacheStoreName.MEMBERS_PROFILE, newStore);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};



export const fetchProfile = async (
  address: string
): Promise<AccountProfile> => {
  const cachedProfile = await getCachedProfile({ address });

  const date = new Date();
  date.setDate(date.getDate() - 14)
  // date.setSeconds(date.getSeconds() - 14)

  if (cachedProfile && new Date(cachedProfile.lastUpdated) < date ) {
    console.log("refetch profile")
    return cachedProfile;
  }
  const profile = await getProfileForAddress({address, rpcUri: HAUS_RPC['0x1']});
  cacheProfile({
    address,
    profile,
  });
  return profile;
};

const initProfilesStore = async () => {
  const local = await localforage;
  local.config(CACHE_CONFIG);
  const store = await getProfileStore();
  if (!store) {
    await local.setItem(CacheStoreName.MEMBERS_PROFILE, {});
  }
};

initProfilesStore();
