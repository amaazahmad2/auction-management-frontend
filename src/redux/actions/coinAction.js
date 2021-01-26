import { ADD_COINS } from './types/coins';

export const addCoinsAction = (numberOfCoins) => {
  return {
    type: ADD_COINS,
    payload: {coins:numberOfCoins },
  };
};