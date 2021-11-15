namespace MapEditor.Forms
{
    partial class TifConvertPNGDialog
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.ChooseTifDir = new System.Windows.Forms.Button();
            this.label_tif_dir_name = new System.Windows.Forms.Label();
            this.ChoosePngDir = new System.Windows.Forms.Button();
            this.label_png_dir_name = new System.Windows.Forms.Label();
            this.button_start_convert = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // ChooseTifDir
            // 
            this.ChooseTifDir.Location = new System.Drawing.Point(62, 71);
            this.ChooseTifDir.Name = "ChooseTifDir";
            this.ChooseTifDir.Size = new System.Drawing.Size(97, 23);
            this.ChooseTifDir.TabIndex = 0;
            this.ChooseTifDir.Text = "选择tif文件夹";
            this.ChooseTifDir.UseVisualStyleBackColor = true;
            this.ChooseTifDir.Click += new System.EventHandler(this.ChooseTifDir_Click);
            // 
            // label_tif_dir_name
            // 
            this.label_tif_dir_name.AutoSize = true;
            this.label_tif_dir_name.Location = new System.Drawing.Point(182, 76);
            this.label_tif_dir_name.Name = "label_tif_dir_name";
            this.label_tif_dir_name.Size = new System.Drawing.Size(0, 12);
            this.label_tif_dir_name.TabIndex = 1;
            // 
            // ChoosePngDir
            // 
            this.ChoosePngDir.Location = new System.Drawing.Point(62, 136);
            this.ChoosePngDir.Name = "ChoosePngDir";
            this.ChoosePngDir.Size = new System.Drawing.Size(97, 23);
            this.ChoosePngDir.TabIndex = 2;
            this.ChoosePngDir.Text = "选择转换后png文件夹";
            this.ChoosePngDir.UseVisualStyleBackColor = true;
            this.ChoosePngDir.Click += new System.EventHandler(this.ChoosePngDir_Click);
            // 
            // label_png_dir_name
            // 
            this.label_png_dir_name.AutoSize = true;
            this.label_png_dir_name.Location = new System.Drawing.Point(182, 141);
            this.label_png_dir_name.Name = "label_png_dir_name";
            this.label_png_dir_name.Size = new System.Drawing.Size(0, 12);
            this.label_png_dir_name.TabIndex = 3;
            // 
            // button_start_convert
            // 
            this.button_start_convert.Location = new System.Drawing.Point(343, 352);
            this.button_start_convert.Name = "button_start_convert";
            this.button_start_convert.Size = new System.Drawing.Size(75, 23);
            this.button_start_convert.TabIndex = 4;
            this.button_start_convert.Text = "开始转换";
            this.button_start_convert.UseVisualStyleBackColor = true;
            this.button_start_convert.Click += new System.EventHandler(this.button_start_convert_Click);
            // 
            // TifConvertPNGDialog
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.button_start_convert);
            this.Controls.Add(this.label_png_dir_name);
            this.Controls.Add(this.ChoosePngDir);
            this.Controls.Add(this.label_tif_dir_name);
            this.Controls.Add(this.ChooseTifDir);
            this.Name = "TifConvertPNGDialog";
            this.Text = "TifConvertPNGDialog";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button ChooseTifDir;
        private System.Windows.Forms.Label label_tif_dir_name;
        private System.Windows.Forms.Button ChoosePngDir;
        private System.Windows.Forms.Label label_png_dir_name;
        private System.Windows.Forms.Button button_start_convert;
    }
}