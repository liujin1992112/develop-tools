using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Windows.Forms;

namespace MapEditor.Forms
{
    /// <summary>
    /// C# winform 程序无法断电解决办法：https://www.cnblogs.com/cyqdeshenluo/p/16590700.html
    /// 注意：自定义如果写在最前面，则无法打开winform窗口设计器  https://blog.csdn.net/u014248312/article/details/53781366
    /// </summary>
    public partial class FontClipDialog : Form
    {
        /// <summary>
        /// 字体文件路径
        /// </summary>
        private string fontPath = "D:/项目资料/games-case/games/candy/fonts/comicbook.ttf";

        private Font font;
        /// <summary>
        /// 字体大小
        /// </summary>
        private int fontSize = 12;

        /// <summary>
        /// 字体颜色
        /// </summary>
        private Color fontColor = Color.Black;

        private string content = "0123456789";

        /// <summary>
        /// 字体样式名称
        /// </summary>
        private List<string> fontStyles = new List<string>();
        private PrivateFontCollection pfc = new PrivateFontCollection();

        public FontClipDialog()
        {
            InitializeComponent();


            this.InitUI();
        }

        public void InitUI()
        {
            this.LoadFont(this.fontPath);
            this.CreateFont();

            // 获取枚举类型的字段名称
            FieldInfo[] fields = typeof(FontStyle).GetFields(BindingFlags.Static | BindingFlags.Public);
            foreach (var item in fields)
            {
                this.fontStyles.Add(item.Name);
            }

            this.comboBoxFontStyles.Items.AddRange(this.fontStyles.ToArray());
            this.comboBoxFontStyles.SelectedIndex = 0;

            this.numericUpDownFontSize.Value = this.fontSize;
            this.textBoxContent.Text = this.content;
            this.labelColor.Text = ToHexColor(this.fontColor);
        }

        /// <summary>
        /// 加载字体文件
        /// 参考文档：
        /// https://blog.csdn.net/xjjrocker/article/details/8232624
        /// https://blog.csdn.net/bobo830/article/details/6422248
        /// </summary>
        /// <param name="filename"></param>
        public void LoadFont(string filename)
        {
            //加载自定义的字体
            //String projectName = Assembly.GetExecutingAssembly().GetName().Name.ToString();
            //Stream fontStream = System.Reflection.Assembly.GetExecutingAssembly().GetManifestResourceStream(projectName + ".Resource" + ".Fixedsys.ttf");
            Stream fontStream = File.OpenRead(filename);
            byte[] fontdata = new byte[fontStream.Length];
            fontStream.Read(fontdata, 0, (int)fontStream.Length);
            fontStream.Close();
            unsafe //打开"允许不安全代码编译"开关，此句才不报错
            {
                fixed (byte* pFontData = fontdata)
                {
                    pfc.AddMemoryFont((System.IntPtr)pFontData, fontdata.Length);
                }
            }
        }

        /// <summary>
        /// 创建和更新字体
        /// </summary>
        public void CreateFont()
        {
            if (this.pfc != null)
            {
                this.font = new Font(pfc.Families[0], this.fontSize, FontStyle.Regular);
                this.PriviewImage();
            }
        }

        private void FontClipDialog_DragEnter(object sender, DragEventArgs e)
        {
            string[] strDrop = (string[])e.Data.GetData(DataFormats.FileDrop, true);
            if (strDrop.Length > 0)
            {
                this.textBoxFont.Text = this.fontPath = strDrop[0].Trim();
                this.LoadFont(this.fontPath);

            }
        }

        private void FontClipDialog_DragDrop(object sender, DragEventArgs e)
        {

        }

        /// <summary>
        /// [颜色：RGB转成16进制]
        /// 参考文档：https://www.cnblogs.com/MRRAOBX/articles/3600420.html
        /// </summary>
        /// <param name="color">颜色</param>
        /// <returns>十六进制值，如果参数为空，默认返回#000000</returns>
        private static string ToHexColor(Color color)
        {
            if (color.IsEmpty)
                return "#000000";
            string R = Convert.ToString(color.R, 16);
            if (R == "0")
                R = "00";
            string G = Convert.ToString(color.G, 16);
            if (G == "0")
                G = "00";
            string B = Convert.ToString(color.B, 16);
            if (B == "0")
                B = "00";
            string HexColor = "#" + R + G + B;
            return HexColor.ToUpper();
        }

        private void labelColor_Click(object sender, EventArgs e)
        {
            ColorDialog dialog = new ColorDialog();
            dialog.ShowDialog();
            this.labelColor.Text = ToHexColor(dialog.Color);
            this.fontColor = dialog.Color;
            this.CreateFont();
        }


        #region 测试代码

        /// <summary>
        /// 生成文字图片
        /// </summary>
        /// <param name="text"></param>
        /// <param name="isBold"></param>
        /// <param name="fontSize"></param>
        /// 参考文档：https://blog.csdn.net/weixin_34126215/article/details/85837790
        public Image CreateImage(string text, bool isBold, int fontSize)
        {
            int wid = 400;
            int high = 200;
            Font font;
            if (isBold)
            {
                font = new Font("Arial", fontSize, FontStyle.Bold);

            }
            else
            {
                font = new Font("Arial", fontSize, FontStyle.Regular);

            }
            // 绘笔颜色
            SolidBrush brush = new SolidBrush(Color.Black);
            StringFormat format = new StringFormat(StringFormatFlags.NoClip);

            // 创建一张图片
            Bitmap image = new Bitmap(wid, high);

            // 获取图片的画笔
            Graphics g = Graphics.FromImage(image);

            // 计算文本实际占用的宽高
            SizeF sizef = g.MeasureString(text, font, PointF.Empty, format);
            int width = (int)(sizef.Width + 1);
            int height = (int)(sizef.Height + 1);
            image.Dispose();

            // 用实际文字占用的宽高来创建一个新的图片
            image = new Bitmap(width, height);
            g = Graphics.FromImage(image);
            g.Clear(Color.White); // 透明

            RectangleF rect = new RectangleF(0, 0, width, height);
            // 绘制图片
            g.DrawString(text, font, brush, rect);
            // 释放对象
            g.Dispose();
            return image;
        }

        /// <summary>  
        /// 合并图片  
        /// </summary>  
        /// <param name="imgBack"></param>  
        /// <param name="img"></param>  
        /// <returns></returns>  
        public static Bitmap CombinImage(Image imgBack, Image img, int xDeviation = 0, int yDeviation = 0)
        {

            Bitmap bmp = new Bitmap(imgBack.Width, imgBack.Height + img.Height);

            Graphics g = Graphics.FromImage(bmp);
            g.Clear(Color.White);
            g.DrawImage(imgBack, 0, 0, imgBack.Width, imgBack.Height); //g.DrawImage(imgBack, 0, 0, 相框宽, 相框高);     

            //g.FillRectangle(System.Drawing.Brushes.White, imgBack.Width / 2 - img.Width / 2 - 1, imgBack.Width / 2 - img.Width / 2 - 1,1,1);//相片四周刷一层黑色边框    

            //g.DrawImage(img, 照片与相框的左边距, 照片与相框的上边距, 照片宽, 照片高);    

            g.DrawImage(img, imgBack.Width / 2 - img.Width / 2 + xDeviation, imgBack.Height + yDeviation, img.Width, img.Height);
            GC.Collect();
            return bmp;
        }


        /// <summary>  
        /// Resize图片  
        /// </summary>  
        /// <param name="bmp">原始Bitmap</param>  
        /// <param name="newW">新的宽度</param>  
        /// <param name="newH">新的高度</param>  
        /// <param name="mode">保留着，暂时未用</param>  
        /// <returns>处理以后的图片</returns>  
        public static Image ResizeImage(Image bmp, int newW, int newH, int mode)
        {
            try
            {
                Image b = new Bitmap(newW, newH);
                Graphics g = Graphics.FromImage(b);

                // 插值算法的质量    
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.DrawImage(bmp, new Rectangle(0, 0, newW, newH), new Rectangle(0, 0, bmp.Width, bmp.Height),
                            GraphicsUnit.Pixel);
                g.Dispose();
                return b;
            }
            catch
            {
                return null;
            }
        }

        public void test()
        {
            //Bitmap bmp = CombinImage(ms, img1);
            //MemoryStream ms = new MemoryStream();
            //bmp.Save(ms, ImageFormat.Png);
        }
        #endregion

        private void buttonSave_Click(object sender, EventArgs e)
        {
            Bitmap image = PriviewImage();
        }

        public Bitmap PriviewImage()
        {
            FontClipData data = CalcFontClipData(this.content, true, this.fontSize);
            Console.WriteLine(LitJson.JsonMapper.ToJson(data));

            // 绘笔颜色
            SolidBrush brush = new SolidBrush(this.fontColor);

            Bitmap image = new Bitmap(data.width, data.height);
            {
                Graphics g = Graphics.FromImage(image);
                g.Clear(Color.Transparent); // 透明
                //g.TextRenderingHint = TextRenderingHint.ClearTypeGridFit;
                //g.TextRenderingHint = TextRenderingHint.SingleBitPerPixelGridFit;
                g.TextRenderingHint = TextRenderingHint.AntiAliasGridFit;

                List<CellData> cells = data.cells;
                for (int i = 0; i < cells.Count; i++)
                {
                    CellData cell = cells[i];
                    int x = i * data.cellMaxWidth + (data.cellMaxWidth - cell.width) / 2;
                    int y = (data.cellMaxHeight - cell.height) / 2;
                    g.DrawString(cell.ch, font, brush, x, y);
                }
                // 释放对象
                g.Dispose();
            }
            image.Save("d:/test.png");
            if (this.pictureBoxPreview.Image != null)
            {
                this.pictureBoxPreview.Image.Dispose();
                this.pictureBoxPreview.Image = null;
            }
            this.pictureBoxPreview.Image = image;
            this.pictureBoxPreview.Width = image.Width;
            this.pictureBoxPreview.Height = image.Height;
            return image;
        }

        public FontClipData CalcFontClipData(string text, bool isBold, int fontSize)
        {
            FontClipData data = new FontClipData();

            int wid = 1024;
            int high = 1024;

            // 创建一张图片
            Bitmap image = new Bitmap(wid, high);

            // 获取图片的画笔
            Graphics g = Graphics.FromImage(image);

            // 计算文本实际占用的宽高
            StringFormat format = new StringFormat(StringFormatFlags.NoClip);
            int cellMaxWidth = 1;
            int cellMaxHeight = 1;
            int length = text.Length;

            for (int i = 0; i < length; i++)
            {
                CellData cell = new CellData();

                char ch = text[i];
                SizeF sizef = g.MeasureString(ch + "", font, PointF.Empty, format);
                int width = (int)(sizef.Width + 1);
                int height = (int)(sizef.Height + 1);
                if (width > cellMaxWidth)
                {
                    cellMaxWidth = width;
                }

                if (height > cellMaxHeight)
                {
                    cellMaxHeight = height;
                }

                cell.ch = ch + "";
                cell.width = width;
                cell.height = height;
                data.cells.Add(cell);
            }

            image.Dispose();

            data.cellMaxWidth = cellMaxWidth;
            data.cellMaxHeight = cellMaxHeight;
            data.width = text.Length * cellMaxWidth;
            data.height = cellMaxHeight;

            return data;
        }

        /// <summary>
        /// 字体大小改变
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void numericUpDownFontSize_ValueChanged(object sender, EventArgs e)
        {
            this.fontSize = (int)this.numericUpDownFontSize.Value;
            this.CreateFont();
        }

        /// <summary>
        /// FontClip数据信息
        /// </summary>
        public class FontClipData
        {
            public int cellMaxWidth;
            public int cellMaxHeight;
            public int width;
            public int height;
            public int count;
            public List<CellData> cells = new List<CellData>();
        }

        /// <summary>
        /// 每一个字符数据
        /// </summary>
        public class CellData
        {
            public int width;
            public int height;
            public string ch;
        }
    }
}
