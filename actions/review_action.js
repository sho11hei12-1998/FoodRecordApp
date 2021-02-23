import { AsyncStorage } from 'react-native';

import {
  FETCH_ALL_REVIEWS,
  SELECT_DETAIL_REVIEW,
} from './types';


export const fetchAllReviews = () => {
  // 一旦無名の関数を返す
  return async (dispatch) => {
    // `AsyncStorage`から評価データを読み取る(非同期処理)
    let stringifiedAllReviews = await AsyncStorage.getItem('allReviews');

    // 取り出した評価データをJavaScript用に変換
    let allReviews = JSON.parse(stringifiedAllReviews);

    // もし読み取った評価データがnullだったら
    if (allReviews == null) {
      // `AsyncStorage`に空の評価データを書き込む(非同期処理)
      allReviews = [];
      await AsyncStorage.setItem('allReviews', JSON.stringify(allReviews));
    }

    // 非同期処理が終わるまで待って終わったら値を返す
    dispatch({ type: FETCH_ALL_REVIEWS, payload: allReviews });
  };
};

export const selectDetailReview = (selectedReview) => {
  return { type: SELECT_DETAIL_REVIEW, payload: selectedReview };
};

