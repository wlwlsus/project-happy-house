/* eslint-disable prettier/prettier */
import {
  sidoList,
  gugunList,
  dongList,
  houseList,
  searchList,
  getDealAmountAvgList,
} from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [],
    guguns: [],
    dongs: [],
    houses: [],
    avgList: [],
    selected: false,
    searchData: null,
    type: null,
    house: null,
  },
  getters: {},
  mutations: {
    CLEAR_SIDO_LIST(state) {
      state.sidos = [];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [];
    },
    CLEAR_APT_LIST(state) {
      state.houses = [];
      state.type = null;
      state.house = null;
    },
    CLEAR_SEARCH_DATA(state) {
      state.searchData = null;
    },
    SET_HOUSE_SELECTED(state, bool) {
      state.selected = bool;
    },
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dongName });
      });
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
    },
    SET_SEARCH_TYPE(state, type) {
      state.type = type;
    },
    SET_DETAIL_HOUSE(state, house) {
      state.house = house;
    },
    SET_SEARCH_DATA(state, searchData) {
      state.searchData = searchData;
    },
    SET_AVG_LIST(state, list) {
      state.avgList = list;
    },
  },
  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = { sido: sidoCode };
      gugunList(
        params,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong: ({ commit }, gugunCode) => {
      const params = { gugun: gugunCode };
      dongList(
        params,
        ({ data }) => {
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseList: ({ commit }, dongCode) => {
      const params = {
        dongCode: dongCode,
      };
      houseList(
        params,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getSearchList: ({ commit }, code) => {
      // console.log("getSearchList 호출", code);
      searchList(
        code,
        ({ data }) => {
          commit("SET_SEARCH_TYPE", data.type);
          commit("SET_HOUSE_LIST", data.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_HOUSE", house);
    },

    async getAvgList({ commit }, aptCode) {
      console.log(`getAvgList : ${aptCode}`);
      await getDealAmountAvgList(
        aptCode,
        ({ data }) => {
          commit("SET_AVG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default houseStore;
