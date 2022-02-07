import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    paintItems: [],
    departments: [],
    categories: [],
    imageIDs: [],
    paintIDs: [],
    token: ''
  },

  mutations: {
    addItem(state, item) {
      state.items.push(item);
    },

    addPaintItem(state, paintItem){
      state.paintItems.push(paintItem);
      console.log("items" + state.paintItems);
    },

    addDepartments(state, deps) {
      state.departments = deps;
    },

    addCategories(state, cats) {
      state.categories = cats;
    },

    setImageIDs(state, ids) {
      state.imageIDs = ids; 
      console.log("imageids" + state.imageIDs);
    },

    setPaintIDs(state, ids) {
      state.paintIDs = ids; 
      console.log("paintids" + state.paintIDs);
    },

    addIDsToDepartment(state, obj) {
      const department = state.departments.filter( dep => dep.departmentId == obj.id )[0];
      department['imageIDs'] = obj.imageIDs;
    },

    addIDsToCategory(state, obj) {
      console.log("usooo");
      state.categories.forEach(c => {
        console.log("c.id " + c.id + "obj1.id" + obj.id);
        if(c.id == obj.id){
          console.log("uso za" + c.id);
        }
      })
      const category = state.categories.filter( cat => cat.id == obj.id )[0];
      category['paintIDs'] = obj.paintIDs;
      console.log("cat" + category['paintIDs']);
    },

    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },

    addComment(state, obj) {
      const image = state.items.filter( item => item.objectID == obj.artId )[0];
      if (image) {
        image.comments.push(obj.comment);
      }
    }
  },

  actions: {
    fetchDepartments({ commit }) {
      fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments')
        .then( obj => obj.json() )
          .then( res => commit('addDepartments', res.departments) );
    },

    async fetchIDsByDepartment({ commit, state }, depID) {

      const department = state.departments.filter( dep => dep.departmentId === depID )[0];
      if (department && department['imageIDs']) {
        commit('setImageIDs', department['imageIDs']);
      } else {
        const obj = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${depID}`);
        const res = await obj.json();

        commit('addIDsToDepartment', {
          id: depID,
          imageIDs: res.objectIDs
        });

        commit('setImageIDs', res.objectIDs);
      }
    },

    fetchCategories({ commit }) {
      fetch('http://127.0.0.1:8090/api/categories')
        .then( obj => obj.json() )
          .then( res => {commit('addCategories', res)} );
    },

    async fetchIDsByCategory({ commit, state }, catID) {

      const category = state.categories.filter( cat => cat.id == catID )[0];
      if (category && category['paintIDs']) {
        commit('setPaintIDs', category['paintIDs']);
      } else {
        const obj = await fetch(`http://127.0.0.1:8090/api/paintings/category/${catID}`);
        const res = await obj.json();

        console.log("moj res " + res);
        commit('addIDsToCategory', {
          id: catID,
          paintIDs: res
        });
     
        commit('setPaintIDs', res);
      }
    },

    search({ commit }, q) {
      return new Promise( (resolve, reject) => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${q}`)
          .then( obj => obj.json() )
          .then( res => {
            commit('setImageIDs', res.objectIDs);
            resolve(res.total);
          });
      });
    },

    getPaintItem({ commit, state }, id) {
      return new Promise( (resolve, reject) => {

        console.log("Promis");
        const paintItem = state.paintItems.filter( paintItem => paintItem.id == id )[0];
        
        if (paintItem) {
          resolve(paintItem);
        } else {
          fetch(`http://127.0.0.1:8090/api/paintings/${id}`)
            .then( obj => obj.json())
            .then( res => {
                  console.log(res);
                  commit('addPaintItem', res);
                  resolve(res);
                });
        }
      });
    },

    getItem({ commit, state }, id) {
      return new Promise( (resolve, reject) => {
        console.log("Promis dvojkaa");
        const item = state.items.filter( item => item.objectID == id )[0];
        if (item) {
          resolve(item);
        } else {
          fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
            .then( obj => obj.json())
            .then( res => {
              console.log(res);
                  commit('addItem', res);
                  resolve(res);
            });
        }
      });
    },

    register({ commit }, obj) {
      fetch('/api_register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => commit('setToken', tkn.token) );
    },

    login({ commit }, obj) {
      fetch('/api_login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then( res => res.json() )
      .then( tkn => {
        if (tkn.msg) {
          alert(tkn.msg);
        } else {
          commit('setToken', tkn.token)
        }
      });
    },

    socket_comment({ commit }, msg) {
      const comment = JSON.parse(msg);
      commit('addComment', { artId: comment.artId, comment: comment });
    }
  }
})
