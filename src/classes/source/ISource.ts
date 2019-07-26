interface ISource {
    getMemes() : Promise<Array<IMeme>>;
}

export default ISource;