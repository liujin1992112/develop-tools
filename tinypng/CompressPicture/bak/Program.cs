using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;
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
        static int ApiKeyIdx = 2;

        //任务数量
        static int taskNum = 0;

        //每一个账号最大压缩次数限制上线
        const int COMPRESS_TIMES_LIMIT_THIS_MONTH = 500;

        //本账号本月压缩次数
        static uint? compressionsThisMonth = 0;

        static AutoResetEvent myEvent = new AutoResetEvent(false);


        static void Main(string[] args)
        {
            string workDir = System.IO.Directory.GetCurrentDirectory();
            Console.WriteLine("工作空间目录:{0}", workDir);

            //string assetDir = "E:\\Work\\Shooter\\shooter\\assets\\resources";
            //string assetDir = "E:\\Work\\Shooter\\shooter\\assets\\resources\\game\\images\\battle\\map";
            string assetDir = "E:\\NewImages";

            InitThreadPool();

            StartCompress(assetDir);

            Console.ReadKey();
        }

        /// <summary>
        /// 初始化线程池
        /// </summary>
        public static void InitThreadPool()
        {
            // 当前计算机上的处理器数量
            int processorCount = Environment.ProcessorCount;
            int minWorkThreadCount = processorCount * 4;
            int minIOWorkThreadCount = processorCount * 2;
            ThreadPool.SetMinThreads(minWorkThreadCount, minIOWorkThreadCount);
        }

        public static async void StartCompress(string assetDir)
        {
            //验证账号是否合法,避免采用多线程方式压缩资源时,每次都去验证账号合法导致异常
            bool isValid = await CheckAccount();
            if (isValid)//合法
            {
                compressionsThisMonth = Tinify.CompressionCount;

                Console.WriteLine("本月压缩次数:{0}", compressionsThisMonth);
                BatchCompress(assetDir);
            }
            else
            {
                Console.WriteLine("本月图片压缩次数已用尽,请添加App Key!");
            }
        }

        public static async Task<bool> CheckAccount()
        {
            //阻塞AppKey是否有效
            return await DoValidateApi();
        }

        /// <summary>
        /// 执行批量压缩某一个目录的资源
        /// </summary>
        /// <param name="assetDir"></param>
        public static void BatchCompress(string assetDir)
        {
            //不支持此种表达式
            //GetAllPictureFiles(assetDir, "(*.jpg|*.jpeg|*.bmp|*.png)", ref list);
            List<string> list = new List<string>();
            GetAllPictureFiles(assetDir, "*.*", ref list);

            //设置任务数量
            taskNum = list.Count;

            Console.WriteLine("开始压缩,图片数量:{0}", list.Count);
            foreach (var f in list)
            {
                Console.WriteLine(f);
                FileInfo info = new FileInfo(f);
                string input = f;
                string output = f;
                ThreadPool.QueueUserWorkItem(p =>
                {
                    DoCompressRequest(input, output);
                });
            }
            Console.WriteLine("等待压缩...");
            myEvent.WaitOne();
            Console.WriteLine("压缩完毕!按任意键退出...");
        }

        /// <summary>
        /// 执行压缩请求
        /// </summary>
        /// <param name="input"></param>
        /// <param name="output"></param>
        public static async void DoCompressRequest(string input, string output)
        {
            //阻塞等待文件写入完成
            var resultData = await CompressImage(input, output);
            await File.WriteAllBytesAsync(output, resultData);

            var compressionsThisMonth = Tinify.CompressionCount;
            Console.WriteLine("本月压缩次数:{0}", compressionsThisMonth);

            //压缩完成,任务数量减少,如果为0，则所有任务执行完成
            taskNum--;
            if (taskNum <= 0)
            {
                //任务执行完成，通知结束
                myEvent.Set();
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
