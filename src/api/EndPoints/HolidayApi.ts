export const urlApi = (InProd: boolean = false) => {
  return InProd ? 'https://porthos-intra.cg.helmo.be/q210054/' : 'https://localhost:7048/';
};
