import { main } from ".";

// hacky timer that keeps nodejs processing running
setInterval(function () {}, 1000 * 60 * 60);

main();
