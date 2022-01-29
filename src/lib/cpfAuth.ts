const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export default function cpfAuth(cpf: string) {
  const cpfNumber = cpf.split(/[.-]/).join('');
  if (cpfNumber.length !== 11) return false;
  return maskCPF(cpf);
}
