import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MessageFacets = buildModule("MessageFacets", (m) => {
  const setMessageFacet = m.contract("SetMsg");
  const getMessageFacet = m.contract("GetMessage");

  return { setMessageFacet, getMessageFacet  };
});

export default MessageFacets;
