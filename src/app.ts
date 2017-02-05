import example from 'example';
import * as text from 'localization';
import * as configuration from 'configuration';
import * as log from 'loglevel';

log.setLevel('debug');
log.info(example.content);
log.error(text.error_msg);
log.warn(configuration.path);