import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MessageFacets = buildModule("MessageFacets", (m) => {
  const count = m.contract("Count")

  return { count  };
});

export default MessageFacets;
