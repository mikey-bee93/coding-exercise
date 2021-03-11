const express = require("express");
const cors = require("cors");
const winston = require("winston");
const AuthRoute = require("./routes/auth");
const AuthService = require("./services/auth");
const ProjectRoute = require("./routes/project");
const ProjectService = require("./services/project");
const CompaniesRoute = require("./routes/companies");
const CompanyService = require("./services/companies");
const SubmittalRoute = require("./routes/submittals");
const SubmittalService = require("./services/submittals");
const checkAuth = require("./middleware");

const server = express();

const authService = new AuthService();
const projectService = new ProjectService();
const companyService = new CompanyService();
const submittalService = new SubmittalService();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({
  extended: true
}));

server.use("/api/project", checkAuth, ProjectRoute.buildRoutes(projectService));
server.use("/api/companies", checkAuth, CompaniesRoute.buildRoutes(companyService));
server.use("/api/submittals", checkAuth, SubmittalRoute.buildRoutes(submittalService))

server.use("/auth", AuthRoute.buildRoutes(authService));

server.listen(8000, () => {
  winston.info("Server started on Port 8000.");
});