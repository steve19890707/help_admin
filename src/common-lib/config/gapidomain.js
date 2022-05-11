const host = window.location.host;
const protocol = window.location.protocol;
const domains = {
  dev: `/api`,
  qa: `/api`,
  int: `/api`,
  prod: `/api`,
};
export const fetchGapiDomain = ({
  getDev = "rd-dev-",
  getQa = "rd-qa-",
  getInt = "rd-int-",
}) => {
  const local = !!~host.indexOf(":");
  const isDev = !!~host.indexOf(getDev);
  const isQa = !!~host.indexOf(getQa);
  const isInt = !!~host.indexOf(getInt);
  if (local || isDev) {
    return `${protocol}//${domains.dev}`;
  } else if (isQa) {
    return `${protocol}//${domains.qa}`;
  } else if (isInt) {
    return `${protocol}//${domains.int}`;
  } else return `${protocol}//${domains.prod}`;
};
