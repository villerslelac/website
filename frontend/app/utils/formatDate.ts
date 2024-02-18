const formatDate = (date: string) => {
  const frenchMonths = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];

  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = frenchMonths[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  return `${day} ${month} ${year}`;
};

export default formatDate;
