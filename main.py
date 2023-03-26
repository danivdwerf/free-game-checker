import os
import decky_plugin

class Plugin:
    async def _main(self):
        decky_plugin.logger.info("free-game-checker loading")
        pass

    async def _unload(self):
        decky_plugin.logger.info("free-game-checker unloading")
        pass

    async def log(self, message: str):
        decky_plugin.logger.info(message)
