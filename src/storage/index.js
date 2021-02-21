const STORAGE_KEY = 'mall';

export default {
  getItem (key, module_name) {
    if(!this.getStorage()[key]) return;
    if (module_name) {
      let val = this.getItem(module_name);
      if (val) return val[key];
    }
    return this.getStorage()[key];
  },
  setItem (key, value, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      if(!val) return;
      val[key] = value;
      this.setItem(module_name, val);
    }
    else {
      let val = this.getStorage();
      val[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },
  clear (key, module_name) {
    if (module_name) {
      let val = this.getItem(module_name);
      if (!val||!val[key]) return;
      delete val[key];
      this.setItem(module_name, val)
    }
    else {
      let val = this.getStorage();
      if(!val[key]) return;
      delete val[key];
      window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val));
    }
  },
  getStorage () {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)) || {};
  }
}