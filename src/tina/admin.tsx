import React from "react";
import { TinaAdmin } from "tinacms";
import tinaConfig from "../../tina/config";

const TinaCMSAdmin = () => {
	return <TinaAdmin config={tinaConfig} />;
};

export default TinaCMSAdmin;
