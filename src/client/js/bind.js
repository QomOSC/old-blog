export default (target, key, { value }) => ({
  get() {
    return value.bind(this);
  }
});
