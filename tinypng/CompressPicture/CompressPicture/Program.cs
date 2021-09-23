using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;

using TinifyAPI;

namespace CompressPicture
{
    class Program
    {
        //秘钥列表
        static string[] ApiKeys =
        {
            "mQWSMbhZxS92t8qDYGS0tdKmYWLkC5ld",
            "dQVJ8f7QZMt8Flmz3rdWxQbX3VxSRYZB",

            "5xFFFxt2jWBmhlR89RND1Kr9T2xql3Vq",
            "hL2r2n6Q0f8JzdN3lt0G8MznFmRvVW4C",
        };

        //当前使用的秘钥索引
        static int ApiKeyIdx = 0;

        static void Main(string[] args)
        {
            string workDir = System.IO.Directory.GetCurrentDirectory();
            Console.WriteLine("工作空间目录:{0}", workDir);

            //string assetDir = "E:\\Work\\Shooter\\shooter\\assets\\resources";
            //string assetDir = "E:\\Work\\Shooter\\shooter\\assets\\resources\\game\\images\\battle\\map";
            string assetDir = "E:\\Work\\Shooter\\shooter\\assets\\resources\\game\\dragonbones";
            //string assetDir = "E:\\NewImages";

            BatchCompress(assetDir);
            Console.ReadKey();
        }

        public static async void BatchCompress(string assetDir)
        {   
            //不支持此种表达式
            //GetAllPictureFiles(assetDir, "(*.jpg|*.jpeg|*.bmp|*.png)", ref list);
            List<string> list = new List<string>();
            GetAllPictureFiles(assetDir, "*.*", ref list);

            Console.WriteLine("开始压缩,图片数量:{0}", list.Count);
            foreach (var f in list)
            {
                Console.WriteLine(f);
                FileInfo info = new FileInfo(f);
                string input = f;
                string output = f;
                await DoCompressRequest(input, output);
            }
            Console.WriteLine("压缩完毕!按任意键退出...");
        }

        public static async Task DoCompressRequest(string input, string output)
        {
            bool isValid = await DoValidateApi();
            if (isValid)
            {
                var compressionsThisMonth = Tinify.CompressionCount;
                Console.WriteLine("本月压缩次数:{0}", compressionsThisMonth);

                var resultData = await CompressImage(input, output);
                await File.WriteAllBytesAsync(output, resultData);
            }
            else
            {
                Console.WriteLine("本月图片压缩次数已用尽,请添加App Key!");
            }

        }

        public static async Task<bool> DoValidateApi()
        {
            if (ApiKeyIdx >= ApiKeys.Length)
            {
                return false;
            }
            string key = ApiKeys[ApiKeyIdx];
            bool isValid = await ValidateApiKey(key);
            if (isValid) return true;
            ApiKeyIdx++;
            return await DoValidateApi();
        }

        /// <summary>
        /// 异步方式验证秘钥是否通过
        /// </summary>
        /// <returns></returns>
        static public async Task<bool> ValidateApiKey(string key)
        {
            Tinify.Key = key;

            try
            {
                Tinify.Key = key;
                return await Tinify.Validate();
            }
            catch (System.Exception e)
            {
                // Validation of API key failed.
                Console.WriteLine(e.Message);
            }
            return false;
        }

        static public async Task<byte[]> CompressImage(string input, string output)
        {
            byte[] sourceData = File.ReadAllBytes(input);
            return await Tinify.FromBuffer(sourceData).ToBuffer();
        }


        public static void GetAllPictureFiles(string directory, string pattern, ref List<string> list)
        {
            DirectoryInfo directoryInfo = new DirectoryInfo(directory);
            foreach (FileInfo info in directoryInfo.GetFiles(pattern))
            {
                string name = info.Name.ToLower();
                if (name.EndsWith(".jpg")
                    || name.EndsWith(".jpeg")
                    || name.EndsWith(".bmp")
                    || name.EndsWith(".png"))
                    list.Add(info.FullName);
            }

            foreach (DirectoryInfo info in directoryInfo.GetDirectories())
            {
                GetAllPictureFiles(info.FullName, pattern, ref list);
            }
        }
    }
}
