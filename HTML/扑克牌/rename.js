// ����fs�ļ�����ģ��
var fs = require("fs");
// ��������Ҫ���ĵ���'icons'�ļ���
// ���ǲ����ñ�����ʾ����ļ������ƣ������պ�ά���͹���
var src = 'images';

// API�ĵ������ҵ������ļ��е�API
// �ҵ��ˣ���fs.readdir(path, callback)
// �ĵ�����������
// ��ȡ path ·������Ŀ¼�����ݡ� �ص����� (callback) ������������ (err, files) ���� files ��һ���洢Ŀ¼�����������ļ����Ƶ�����
// ��ˣ�
fs.readdir(src, function(err, files) {
    // files���������飬���
    // ����ʹ��forEach������, �˴�ΪES5 JSһ��֪ʶ
    // ����������Ҳ����ʹ��forѭ����
	var i=0;
    files.forEach(function(filename) {
        // ��������ļ�����������
        // API�ĵ����ҵ���������API������
        // fs.rename(oldPath, newPath, callback)       
        // ���棬���ǾͿ�������«��ư��ȷ���¾��ļ����ƣ�

        var oldPath = src + '/' + filename, newPath = src + '/' + i+'.gif';
        // ����������
        fs.rename(oldPath, newPath, function(err) {
            if (!err) {
                console.log(filename + '�»����滻�ɹ�!');
            }       
        })
	i++;
    });
});