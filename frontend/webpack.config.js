module.exports = {
    // other webpack configurations...
    module: {
        rules: [
            // other rules...
            {
                test: /\.pdf$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'pdfs/' // or any other desired output path
                        }
                    }
                ]
            }
        ]
    }
};
