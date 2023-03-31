import os
import logging
from settings import SettingsManager

# Set up logger
logging.basicConfig(filename=os.path.join(os.environ["DECKY_PLUGIN_LOG_DIR"], 'backend.log'), format='[free-game-checker] %(asctime)s %(levelname)s %(message)s', filemode='w+', force=True)
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Set up settings
settings = SettingsManager(name="settings", settings_directory=os.environ["DECKY_PLUGIN_SETTINGS_DIR"])
settings.read()

class Plugin:
    async def _main(self):
        logger.info("loading...")
        pass

    async def _unload(self):
        logger.info("unloading...")
        pass

    async def getSetting(self, key: str, defaults):
        logger.info("Get setting: '{}'".format(key))
        return settings.getSetting(key, defaults)

    async def setSetting(self, key: str, value):
        loggin.info("Set setting: '{}': {}").format(key, value)
        return settings.setSetting(key, value)
    
    async def log(self, message: str):
        logger.info(message)